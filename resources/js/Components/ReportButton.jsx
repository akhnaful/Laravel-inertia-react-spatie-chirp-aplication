import { Dialog, DialogTrigger, DialogContent } from '@/Components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';

export default function ReportButton({ type, id }) {
    const { data, setData, post, processing } = useForm({
        reportable_id: id,
        reportable_type: type === 'chirp' ? 'App\\Models\\Chirp' : 'App\\Models\\User',
        reason: ''
    });

    const submitReport = () => {
        Inertia.post('/reports', {
            reportable_id: id, // ID dari Chirp atau User yang dilaporkan
            reportable_type: type === 'chirp' ? 'App\\Models\\Chirp' : 'App\\Models\\User', // Tipe model
            reason: reason // Alasan pelaporan
        }, {
            onSuccess: () => {
                setIsOpen(false);
                setReason('');
            }
        });
    };

    return (
        <Dialog id="report-dialog">
            <DialogTrigger asChild>
                <Button variant="ghost" className="text-xs text-gray-500 hover:text-red-500">
                    Report
                </Button>
            </DialogTrigger>
            <DialogContent>
                <h3 className="text-lg font-semibold">Report {type}</h3>
                <textarea
                    className="mt-4 p-2 border rounded w-full"
                    placeholder="Reason for reporting..."
                    value={data.reason}
                    onChange={(e) => setData('reason', e.target.value)}
                />
                <div className="mt-4 flex justify-end gap-2">
                    <Button onClick={submitReport} disabled={processing}>
                        {processing ? 'Submitting...' : 'Submit Report'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}