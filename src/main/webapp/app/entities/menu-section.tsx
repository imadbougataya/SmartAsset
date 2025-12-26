import React from 'react';

export const MenuSection = ({ title }: { title: string }) => (
  <li className="nav-item px-3 mt-3">
    <span
      className="d-flex align-items-center text-muted"
      style={{
        fontSize: '0.75rem',
        letterSpacing: '0.04em',
        opacity: 0.85,
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: 'currentColor',
          marginRight: 8,
          opacity: 0.5,
        }}
      />
      {title.toUpperCase()}
    </span>
  </li>
);
