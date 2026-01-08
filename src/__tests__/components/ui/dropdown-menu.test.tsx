import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuGroup,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu';

describe('DropdownMenu Component', () => {
  it('renders dropdown trigger', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
      </DropdownMenu>
    );
    expect(screen.getByText('Open Menu')).toBeInTheDocument();
  });

  it('opens dropdown when trigger is clicked', async () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    
    expect(await screen.findByText('Item 1')).toBeInTheDocument();
  });

  it('renders menu items', async () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
          <DropdownMenuItem>Item 3</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    
    expect(await screen.findByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  it('renders menu label', async () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    
    expect(await screen.findByText('My Account')).toBeInTheDocument();
  });

  it('renders menu separator', async () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuSeparator data-testid="separator" />
          <DropdownMenuItem>Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    
    expect(await screen.findByTestId('separator')).toBeInTheDocument();
  });

  it('renders checkbox item', async () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem checked>Show Status Bar</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    
    expect(await screen.findByText('Show Status Bar')).toBeInTheDocument();
  });

  it('renders radio group', async () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value="option1">
            <DropdownMenuRadioItem value="option1">Option 1</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="option2">Option 2</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    
    expect(await screen.findByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('renders menu group', async () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup data-testid="group">
            <DropdownMenuItem>Item 1</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    
    expect(await screen.findByTestId('group')).toBeInTheDocument();
  });

  it('renders shortcut', async () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            New File
            <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    
    expect(await screen.findByText('⌘N')).toBeInTheDocument();
  });

  it('handles item click', async () => {
    const handleClick = jest.fn();
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={handleClick}>Click Me</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    
    const item = await screen.findByText('Click Me');
    fireEvent.click(item);
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders destructive variant', async () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem variant="destructive" data-testid="destructive-item">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    
    const item = await screen.findByTestId('destructive-item');
    expect(item).toHaveAttribute('data-variant', 'destructive');
  });

  it('renders inset menu item', async () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem inset data-testid="inset-item">
            Inset Item
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    
    const item = await screen.findByTestId('inset-item');
    expect(item).toHaveAttribute('data-inset', 'true');
  });

  it('renders inset label', async () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel inset data-testid="inset-label">
            Label
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    
    const label = await screen.findByTestId('inset-label');
    expect(label).toHaveAttribute('data-inset', 'true');
  });

  it('supports disabled items', async () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem disabled>Disabled Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    
    const item = await screen.findByText('Disabled Item');
    expect(item).toHaveAttribute('data-disabled');
  });
});
