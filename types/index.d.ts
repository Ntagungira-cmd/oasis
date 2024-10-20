declare type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
};

declare interface SideBarProps {
  user: User;
}

declare type HeaderBoxProps = {
  type?: "title" | "greeting";
  title: string;
  subtext: string;
  user: string;
};

declare interface MobileNavProps {
  user: User;
}

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

declare interface VisitsData {
  date: string;
  visits: number;
}

declare interface AreaChartProps {
  data?: VisitsData[];
  title?: string;
  total?: {
    value: number | string;
    isPositive: boolean;
  };
}
