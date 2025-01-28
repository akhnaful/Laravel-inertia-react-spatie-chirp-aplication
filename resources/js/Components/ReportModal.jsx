import React, { useState } from "react";
import {  Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,} from "@/Components/ui/dialog";
import {Button} from "@/Components/ui/button";
import {Input} from "@/Components/ui/input";
import {Textarea} from "@/Components/ui/textarea";
import {Label} from "@/Components/ui/label";
import { MessageCircleWarning, CircleUserRound } from "lucide-react";
import { useForm } from "@inertiajs/react";

const ReportModal = ({ type, targetId, userId }) => {
    const [isOpen, setIsOpen] = useState(false);

    const { data, setData, post, reset, processing } = useForm({
        reason: "",
        detail: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const endpoint =
            type === "chirp"
                ? route("chirps.report", targetId)
                : route("user.report", targetId);

        post(endpoint, {
            onSuccess: () => {
                setIsOpen(false);
                reset();
            },
        });
    };

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(true);
    };

    return (
        <>
            <button
                className="w-full flex items-center text-red-600 px-4 py-2 text-left text-sm leading-5 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out"
                onClick={handleClick}
            >
                {type === "chirp" ? (
                    <MessageCircleWarning size={25} className="pr-2" />
                ) : (
                    <CircleUserRound size={25} className="pr-2" />
                )}
                Report {type}
            </button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Report {type === "chirp" ? "Message" : "User"}
                        </DialogTitle>
                        <DialogDescription>
                            Please provide details about the issue.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="reason">Reason for reporting</Label>
                                <Input
                                    id="reason"
                                    type="text"
                                    placeholder="Enter the reason"
                                    value={data.reason}
                                    onChange={(e) =>
                                        setData("reason", e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="detail">Additional details</Label>
                                <Textarea
                                    id="detail"
                                    placeholder="Provide more information about the report"
                                    rows={4}
                                    value={data.detail}
                                    onChange={(e) =>
                                        setData("detail", e.target.value)
                                    }
                                    required
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <div className="flex justify-end gap-2 w-full">
                                <Button
                                    variant="secondary"
                                    onClick={() => {
                                        setIsOpen(false);
                                        reset();
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="destructive"
                                    disabled={processing}
                                >
                                    Submit Report
                                </Button>
                            </div>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ReportModal;