'use client';

import React from 'react';
import { LoadingBarContainer } from 'react-top-loading-bar';

function Layout({ children }: any) {
  return <LoadingBarContainer>{children}</LoadingBarContainer>;
}

export default Layout;
