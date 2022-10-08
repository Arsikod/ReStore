import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

export default function RouterLink({
  children,
  to,
}: {
  children: ReactNode;
  to: string;
}) {
  return <NavLink to={to}>{children}</NavLink>;
}
