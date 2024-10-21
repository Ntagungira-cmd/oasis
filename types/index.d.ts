export declare type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
};

export declare type ClerkUser = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  color: string;
};

export declare interface SideBarProps {
  user: ClerkUser;
}

export declare type HeaderBoxProps = {
  type?: "title" | "greeting";
  title: string;
  subtext: string;
};

export declare interface MobileNavProps {
  user: ClerkUser;
}

export declare interface ChartWrapperProps {
  statsData: StatsCardProps[];
  visits: VisitsData[];
}

export interface StatsCardProps {
  label: string;
  value: string | number;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export declare interface VisitsData {
  visits: number;
}

export declare interface AreaChartProps {
  data?: VisitsData[];
  title?: string;
  total?: {
    value: number | string;
    isPositive: boolean;
  };
}
