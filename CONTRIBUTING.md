# Contributing to Animate UI

Thank you for your interest in **contributing to Animate UI**! Your support is highly appreciated, and we look forward to your contributions. This guide will help you understand the project structure and provide detailed instructions for adding a new component or effect to Animate UI.

**Note:** You only need to modify a few files to add a new component, and it should take you around 10 minutes to complete.

## Getting Started

### Fork and Clone the Repository

#### 1. Fork the Repository

Click [here](https://github.com/Skyleen77/animate-ui/fork) to fork the repository.

#### 2. Clone your Fork to Your Local Machine

```bash
  git clone https://github.com/<YOUR_USERNAME>/animate-ui.git
```

#### 3. Navigate to the Project Directory

```bash
cd animate-ui
```

#### 4. Create a New Branch for Your Changes

```bash
git checkout -b my-branch
```

#### 5. Install Dependencies

```bash
pnpm i
```

#### 6. Run the Project

```bash
pnpm dev
```

## Adding a New Component

To **add a new component to Animate UI**, you will need to update several files. Follow these steps:

### Create the Component

Create your main component in `registry/[category]/my-component/index.tsx`.

```tsx title="my-component/index.tsx"
'use client';

import * as React from 'react';

type MyComponentProps = {
  myProps: string;
} & React.HTMLAttributes<HTMLDivElement>;

const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ myProps, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {/* Your component */}
      </div>
    );
  },
);
MyComponent.displayName = 'MyComponent';

export { MyComponent, type MyComponentProps };
```

### Create the Component Demo

Provide a basic demo to showcase your component in `registry/demo/[category]/my-component-demo/index.tsx`.

```tsx title="my-component-demo/index.tsx"
import MyComponent from '@/registry/[category]/my-component';

export const MyComponentDemo() {
  return (
    <div>
      <MyComponent />
    </div>
  )
}
```

### Update the Documentation Sidebar

Add your component to the documentation sidebar by updating the file `content/docs/meta.json`.

```json title="meta.json"
{
  "title": "Animate UI",
  "root": true,
  "pages": [
    ...,
    "[category]/my-component"
    ...
  ]
}
```

### Create the Component Documentation

Create an MDX file to document your component in `content/docs/[category]/my-component.mdx`.

```mdx
---
title: My Component
description: Description for the new component
---

<ComponentPreview name="my-component-demo" />

## Installation

<ComponentInstallation name="my-component" />

## Props

<TypeTable
  type={{
    myProps: {
      description: 'Description for my props',
      type: 'string',
      required: true,
    },
  }}
/>
```

### Update the Registry

Create a `registry/[category]/my-component/registry-item.json` file to export your component :

```json title="my-component/registry-item.json"
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "my-component",
  "type": "registry:ui",
  "title": "My Component",
  "description": "My Component Description",
  "dependencies": [...],
  "devDependencies": [...],
  "files": [
    {
      "path": "registry/[category]/my-component/index.tsx",
      "type": "registry:ui",
      "target": "components/animate-ui/my-component.tsx"
    }
  ]
}
```

And a `registry/demo/[category]/my-component-demo/registry-item.json` file to export its demo :

```json title="my-component-demo/registry-item.json"
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "my-component-demo",
  "type": "registry:ui",
  "title": "My Component Demo",
  "description": "My Component Demo Description",
  "registryDependencies": ["https://animate-ui.com/r/my-component"],
  "files": [
    {
      "path": "registry/demo/[category]/my-component-demo/index.tsx",
      "type": "registry:ui",
      "target": "components/animate-ui/my-component-demo.tsx"
    }
  ]
}
```

### Build the Registry

To update the registry, run the following command:

```bash
pnpm registry:build
```

## Ask for Help

If you need any assistance or have questions, please feel free to open a [GitHub issue](https://github.com/Skyleen77/animate-ui/issues/new). We are here to help!

Thank you again for your contribution to Animate UI! We look forward to seeing your improvements and new components.
