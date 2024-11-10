import { LucideIcon } from 'lucide-react';


interface StatCardProps {
  title: string;
  Icon: LucideIcon;
  prefix?: string;
  fetchData: () => Promise<number | string>;
}

const StatCard = async ({ title, Icon, prefix = '', fetchData }: StatCardProps) => {
    let data: string | number = "No data found";

    try {
        data = await fetchData();
    } catch (error) {
        console.error(`Error fetching data for ${title}:`, error);
        data = "Error loading data";
    }
    
    return (
        <div className="glass rounded-xl p-6 shadow-sm border border-gray-100 hover:scale-105 blockAnime">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-200 gap-1">{title}</p>
                    <p className="text-2xl font-semibold mt-2">
                        {typeof data === 'number' ? `${prefix}${data}` : data}
                    </p>
                </div>
                <div className="p-3 bg-indigo-50 rounded-lg">
                    <Icon className="w-6 h-6 text-indigo-600" />
                </div>
            </div>
        </div>
    );
}

export default StatCard;
