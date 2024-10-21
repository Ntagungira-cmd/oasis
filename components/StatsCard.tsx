import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { StatsCardProps } from "@/types";

const StatsCard = ({
  label,
  value,
  trend,
  className,
  icon,
}: StatsCardProps) => {
  const trendColor = trend?.isPositive ? "text-emerald-500" : "text-red-500";
  const TrendIcon = trend?.isPositive ? TrendingUp : TrendingDown;
  return (
    <Card
      className={cn(
        "bg-blue-100 text-white border-slate-800",
        "w-full sm:w-[48%] md:w-[48%] lg:w-[32%] xl:w-[24%]",
        "transition-all duration-300",
        className
      )}
    >
      <CardContent className="p-4 sm:p-5 lg:p-6 relative">
        <button className="absolute top-2 right-2 sm:top-3 sm:right-3 lg:top-4 lg:right-4 hover:bg-slate-200/10 rounded-full p-1 transition-colors">
          <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
        </button>
        <div className="flex items-center justify-between">
          <div className="space-y-1 sm:space-y-2">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="relative w-5 h-5 sm:w-6 sm:h-6">
                <Image
                  src={icon}
                  alt={`${label} icon`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 20px, 24px"
                />
              </div>
              <p className="text-sm sm:text-md font-semibold text-slate-400 line-clamp-1">
                {label}
              </p>
            </div>
            <div className="flex items-center flex-wrap gap-1 sm:gap-2">
              <p className="text-xl sm:text-2xl font-semibold">{value}</p>
              {trend && (
                <div className={cn("flex items-center", trendColor)}>
                  <TrendIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-0.5 sm:mr-1" />
                  <span className="text-xs sm:text-sm font-medium">
                    {trend?.value}%
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
