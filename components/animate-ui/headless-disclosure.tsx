'use client';

import * as React from 'react';
import {
  Disclosure as DisclosurePrimitive,
  DisclosureButton as DisclosureButtonPrimitive,
  DisclosurePanel as DisclosurePanelPrimitive,
} from '@headlessui/react';
import { AnimatePresence, motion, type Transition } from 'motion/react';

import { cn } from '@/lib/utils';

interface DisclosureContextType {
  isOpen: boolean;
}
const DisclosureContext = React.createContext<DisclosureContextType>({
  isOpen: false,
});

const useDisclosure = (): DisclosureContextType => {
  const context = React.useContext(DisclosureContext);
  if (!context) {
    throw new Error('useDisclosure must be used within a Disclosure');
  }
  return context;
};

type DisclosureProps = React.ComponentPropsWithoutRef<
  typeof DisclosurePrimitive
>;

const Disclosure = React.forwardRef<
  React.ElementRef<typeof DisclosurePrimitive>,
  DisclosureProps
>(({ children, ...props }, ref) => {
  return (
    <DisclosurePrimitive {...props} ref={ref}>
      {(bag) => {
        return (
          <DisclosureContext.Provider value={{ isOpen: bag.open }}>
            {typeof children === 'function' ? children(bag) : children}
          </DisclosureContext.Provider>
        );
      }}
    </DisclosurePrimitive>
  );
});
Disclosure.displayName = DisclosurePrimitive.displayName;

type DisclosureButtonProps = React.ComponentPropsWithoutRef<
  typeof DisclosureButtonPrimitive
>;

const DisclosureButton = React.forwardRef<
  React.ElementRef<typeof DisclosureButtonPrimitive>,
  DisclosureButtonProps
>((props, ref) => {
  return <DisclosureButtonPrimitive ref={ref} {...props} />;
});
DisclosureButton.displayName = DisclosureButtonPrimitive.displayName;

type DisclosurePanelProps = React.ComponentPropsWithoutRef<
  typeof DisclosurePanelPrimitive
> & {
  transition?: Transition;
};

const DisclosurePanel = React.forwardRef<HTMLDivElement, DisclosurePanelProps>(
  (
    {
      className,
      children,
      transition = { type: 'spring', stiffness: 150, damping: 22 },
      ...props
    },
    ref,
  ) => {
    const { isOpen } = useDisclosure();

    return (
      <AnimatePresence>
        {isOpen && (
          <DisclosurePanelPrimitive static as={React.Fragment} {...props}>
            {(bag) => (
              <motion.div
                key="disclosure-panel"
                initial={{ height: 0, opacity: 0, '--mask-stop': '0%' }}
                animate={{ height: 'auto', opacity: 1, '--mask-stop': '100%' }}
                exit={{ height: 0, opacity: 0, '--mask-stop': '0%' }}
                transition={transition}
                style={{
                  maskImage:
                    'linear-gradient(black var(--mask-stop), transparent var(--mask-stop))',
                  WebkitMaskImage:
                    'linear-gradient(black var(--mask-stop), transparent var(--mask-stop))',
                }}
                className={cn('overflow-hidden', className)}
                ref={ref}
              >
                {typeof children === 'function' ? children(bag) : children}
              </motion.div>
            )}
          </DisclosurePanelPrimitive>
        )}
      </AnimatePresence>
    );
  },
);
DisclosurePanel.displayName = DisclosurePanelPrimitive.displayName;

export {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  useDisclosure,
  type DisclosureProps,
  type DisclosureButtonProps,
  type DisclosurePanelProps,
};
