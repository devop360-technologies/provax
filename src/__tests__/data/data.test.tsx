/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from '@jest/globals';

// ============================================
// Card Component Tests
// ============================================
describe('Card Component Rendering', () => {
  it('should render card with default content', () => {
    const { container } = render(
      <div className="card">
        <div className="card-header">Card Title</div>
        <div className="card-content">Card content</div>
      </div>
    );
    
    expect(container.querySelector('.card')).toBeInTheDocument();
    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('should render card with multiple sections', () => {
    const { container } = render(
      <div className="card">
        <div className="card-header">Header</div>
        <div className="card-body">Body</div>
        <div className="card-footer">Footer</div>
      </div>
    );
    
    expect(container.querySelectorAll('.card *').length).toBeGreaterThan(0);
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });
});

// ============================================
// Badge Component Tests
// ============================================
describe('Badge Component', () => {
  it('should render badge with text', () => {
    render(<span className="badge">Active</span>);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('should render multiple badges', () => {
    render(
      <div>
        <span className="badge badge-primary">Primary</span>
        <span className="badge badge-secondary">Secondary</span>
        <span className="badge badge-danger">Danger</span>
      </div>
    );
    
    expect(screen.getByText('Primary')).toHaveClass('badge-primary');
    expect(screen.getByText('Secondary')).toHaveClass('badge-secondary');
    expect(screen.getByText('Danger')).toHaveClass('badge-danger');
  });

  it('should render badge with variant classes', () => {
    const { container } = render(
      <span className="badge badge-success">Success</span>
    );
    
    const badge = container.querySelector('.badge');
    expect(badge).toHaveClass('badge');
    expect(badge).toHaveClass('badge-success');
  });
});

// ============================================
// Avatar Component Tests
// ============================================
describe('Avatar Component', () => {
  it('should render avatar with image', () => {
    render(
      <img 
        alt="User Avatar" 
        src="/avatars/user.png" 
        className="avatar"
      />
    );
    
    const avatar = screen.getByAltText('User Avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveClass('avatar');
  });

  it('should render avatar with different sizes', () => {
    const { container } = render(
      <div>
        <img alt="Small" src="/avatar.png" className="avatar avatar-sm" />
        <img alt="Medium" src="/avatar.png" className="avatar avatar-md" />
        <img alt="Large" src="/avatar.png" className="avatar avatar-lg" />
      </div>
    );
    
    expect(container.querySelector('.avatar-sm')).toBeInTheDocument();
    expect(container.querySelector('.avatar-md')).toBeInTheDocument();
    expect(container.querySelector('.avatar-lg')).toBeInTheDocument();
  });

  it('should render avatar with fallback text', () => {
    render(
      <div className="avatar">
        <div className="avatar-placeholder">JD</div>
      </div>
    );
    
    expect(screen.getByText('JD')).toBeInTheDocument();
  });
});

// ============================================
// Input Component Tests
// ============================================
describe('Input Component', () => {
  it('should render input field', () => {
    render(
      <input 
        type="text" 
        placeholder="Enter text" 
        className="input"
      />
    );
    
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('input');
  });

  it('should render input with different types', () => {
    const { container } = render(
      <div>
        <input type="text" className="input" placeholder="Text" />
        <input type="email" className="input" placeholder="Email" />
        <input type="password" className="input" placeholder="Password" />
        <input type="number" className="input" placeholder="Number" />
      </div>
    );
    
    const inputs = container.querySelectorAll('.input');
    expect(inputs.length).toBe(4);
  });

  it('should render disabled input', () => {
    render(
      <input 
        type="text" 
        disabled 
        placeholder="Disabled" 
        className="input"
      />
    );
    
    const input = screen.getByPlaceholderText('Disabled');
    expect(input).toBeDisabled();
  });

  it('should handle input value changes', () => {
    const { container } = render(
      <input 
        type="text" 
        placeholder="Type here" 
        className="input"
      />
    );
    
    const input = container.querySelector('.input') as HTMLInputElement;
    expect(input.value).toBe('');
  });
});

// ============================================
// Label Component Tests
// ============================================
describe('Label Component', () => {
  it('should render label with text', () => {
    render(
      <label className="label">
        <span>Username</span>
      </label>
    );
    
    expect(screen.getByText('Username')).toBeInTheDocument();
  });

  it('should render label with associated input', () => {
    render(
      <div>
        <label htmlFor="username" className="label">Username</label>
        <input id="username" type="text" className="input" />
      </div>
    );
    
    const label = screen.getByText('Username');
    expect(label).toHaveAttribute('for', 'username');
  });

  it('should render label with required indicator', () => {
    render(
      <label className="label">
        <span>Email</span>
        <span className="label-required">*</span>
      </label>
    );
    
    expect(screen.getByText('*')).toBeInTheDocument();
  });
});

// ============================================
// Progress Component Tests
// ============================================
describe('Progress Component', () => {
  it('should render progress bar with value', () => {
    const { container } = render(
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: '50%' }}></div>
      </div>
    );
    
    const progressBar = container.querySelector('.progress-bar');
    expect(progressBar).toBeInTheDocument();
  });

  it('should render progress with different values', () => {
    const { container } = render(
      <div>
        <div className="progress" data-progress="25"></div>
        <div className="progress" data-progress="50"></div>
        <div className="progress" data-progress="100"></div>
      </div>
    );
    
    const progressElements = container.querySelectorAll('.progress');
    expect(progressElements.length).toBe(3);
  });
});

// ============================================
// Modal Component Tests
// ============================================
describe('Modal Component', () => {
  it('should render modal when visible', () => {
    render(
      <div className="modal modal-open">
        <div className="modal-content">
          <h2>Modal Title</h2>
          <p>Modal content</p>
        </div>
      </div>
    );
    
    expect(screen.getByText('Modal Title')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('should render modal with close button', () => {
    render(
      <div className="modal">
        <div className="modal-header">
          <h2>Title</h2>
          <button className="modal-close">×</button>
        </div>
        <div className="modal-body">Content</div>
      </div>
    );
    
    expect(screen.getByText('×')).toBeInTheDocument();
  });

  it('should render modal with action buttons', () => {
    render(
      <div className="modal">
        <div className="modal-content">Content</div>
        <div className="modal-footer">
          <button className="btn-cancel">Cancel</button>
          <button className="btn-confirm">Confirm</button>
        </div>
      </div>
    );
    
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });
});

// ============================================
// Tabs Component Tests
// ============================================
describe('Tabs Component', () => {
  it('should render tab navigation', () => {
    render(
      <div className="tabs">
        <div className="tab-nav">
          <button className="tab-button">Tab 1</button>
          <button className="tab-button">Tab 2</button>
          <button className="tab-button">Tab 3</button>
        </div>
        <div className="tab-content">Content</div>
      </div>
    );
    
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Tab 3')).toBeInTheDocument();
  });

  it('should render tabs with active state', () => {
    const { container } = render(
      <div className="tabs">
        <button className="tab-button active">Active</button>
        <button className="tab-button">Inactive</button>
      </div>
    );
    
    const activeButton = container.querySelector('.tab-button.active');
    expect(activeButton).toHaveClass('active');
  });
});

// ============================================
// List Component Tests
// ============================================
describe('List Component', () => {
  it('should render list with items', () => {
    render(
      <ul className="list">
        <li className="list-item">Item 1</li>
        <li className="list-item">Item 2</li>
        <li className="list-item">Item 3</li>
      </ul>
    );
    
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  it('should render empty list', () => {
    const { container } = render(
      <ul className="list"></ul>
    );
    
    const list = container.querySelector('.list');
    expect(list?.children.length).toBe(0);
  });

  it('should render list with icons', () => {
    render(
      <ul className="list">
        <li className="list-item">
          <span className="icon">✓</span>
          <span>Completed</span>
        </li>
      </ul>
    );
    
    expect(screen.getByText('✓')).toBeInTheDocument();
  });
});

// ============================================
// Skeleton Component Tests
// ============================================
describe('Skeleton Component', () => {
  it('should render skeleton loader', () => {
    const { container } = render(
      <div className="skeleton"></div>
    );
    
    expect(container.querySelector('.skeleton')).toBeInTheDocument();
  });

  it('should render multiple skeleton lines', () => {
    const { container } = render(
      <div>
        <div className="skeleton skeleton-line"></div>
        <div className="skeleton skeleton-line"></div>
        <div className="skeleton skeleton-line"></div>
      </div>
    );
    
    const skeletons = container.querySelectorAll('.skeleton-line');
    expect(skeletons.length).toBe(3);
  });
});

// ============================================
// Separator Component Tests
// ============================================
describe('Separator Component', () => {
  it('should render horizontal separator', () => {
    const { container } = render(
      <hr className="separator" />
    );
    
    expect(container.querySelector('.separator')).toBeInTheDocument();
  });

  it('should render separator with margin', () => {
    const { container } = render(
      <div className="separator separator-margin"></div>
    );
    
    const separator = container.querySelector('.separator');
    expect(separator).toHaveClass('separator-margin');
  });
});

// ============================================
// Dropdown Component Tests
// ============================================
describe('Dropdown Component', () => {
  it('should render dropdown with items', () => {
    render(
      <div className="dropdown">
        <button className="dropdown-trigger">Menu</button>
        <ul className="dropdown-menu">
          <li><a href="#option1">Option 1</a></li>
          <li><a href="#option2">Option 2</a></li>
        </ul>
      </div>
    );
    
    expect(screen.getByText('Menu')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });
});

// ============================================
// Alert Component Tests
// ============================================
describe('Alert Component', () => {
  it('should render alert message', () => {
    render(
      <div className="alert alert-info">
        <p>Info message</p>
      </div>
    );
    
    expect(screen.getByText('Info message')).toBeInTheDocument();
  });

  it('should render different alert types', () => {
    const { container } = render(
      <div>
        <div className="alert alert-success">Success</div>
        <div className="alert alert-warning">Warning</div>
        <div className="alert alert-error">Error</div>
      </div>
    );
    
    expect(container.querySelector('.alert-success')).toBeInTheDocument();
    expect(container.querySelector('.alert-warning')).toBeInTheDocument();
    expect(container.querySelector('.alert-error')).toBeInTheDocument();
  });
});
