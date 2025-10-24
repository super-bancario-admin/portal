import React from 'react';
import { useData } from '../../hooks/useData';

const ActivityLog: React.FC = () => {
    const { activityLog, loading } = useData();

    const formatTimestamp = (isoString: string) => {
        return new Date(isoString).toLocaleString('pt-PT', {
            dateStyle: 'medium',
            timeStyle: 'medium',
        });
    };

    return (
        <section>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-serif font-bold text-brand-teal-dark">Log de Atividades</h2>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {loading ? (
                    <div className="p-6 text-center text-brand-grey-medium">A carregar log...</div>
                ) : activityLog.length === 0 ? (
                     <div className="p-6 text-center text-brand-grey-medium">Nenhuma atividade registada.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-brand-grey-dark">
                            <thead className="text-xs text-brand-grey-medium uppercase bg-brand-grey-warm">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Data/Hora</th>
                                    <th scope="col" className="px-6 py-3">Utilizador</th>
                                    <th scope="col" className="px-6 py-3">Ação</th>
                                    <th scope="col" className="px-6 py-3">Detalhes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activityLog.map(log => (
                                    <tr key={log.id} className="bg-white border-b hover:bg-brand-grey-warm">
                                        <td className="px-6 py-4 whitespace-nowrap">{formatTimestamp(log.timestamp)}</td>
                                        <td className="px-6 py-4 font-semibold">{log.user}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 text-xs font-mono rounded-full bg-brand-grey-light text-brand-grey-dark">{log.action}</span>
                                        </td>
                                        <td className="px-6 py-4">{log.details}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ActivityLog;
