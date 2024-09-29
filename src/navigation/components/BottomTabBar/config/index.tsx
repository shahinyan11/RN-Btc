import React from 'react';

import Icon from '@components/icons/Icon';

interface IIcon {
  focused: boolean;
  color: string;
  size: number;
}

export const DashboardIcon = ({focused, color, size}: IIcon) => (
  <Icon
    name="dashboard"
    size={size}
    color={color}
    fill={focused ? 'white' : 'transparent'}
  />
);

export const ExchangeIcon = ({focused, color, size}: IIcon) => (
  <Icon
    name="exchange"
    size={size}
    color={color}
    fill={focused ? 'white' : 'transparent'}
  />
);

export const HistoryIcon = ({focused, color, size}: IIcon) => (
  <Icon
    name="history"
    size={size}
    color={focused ? 'black' : color}
    fill={focused ? 'white' : 'transparent'}
  />
);

export const ProfileIcon = ({focused, color, size}: IIcon) => (
  <Icon
    name="profile"
    size={size}
    color={color}
    fill={focused ? 'white' : 'transparent'}
  />
);
