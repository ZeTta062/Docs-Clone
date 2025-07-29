"use client"

import { toast } from "sonner";
import { useMutation } from "convex/react";
import { Id } from "../../convex/_generated/dataModel"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { api } from "../../convex/_generated/api";
import { useState } from "react";


interface RemoveDialogProps {
    documentId: Id<"documents">;
    children: React.ReactNode;
}

const RemoveDialog = ({
    documentId,
    children
}:RemoveDialogProps) => {
    const remove = useMutation(api.documents.removeById);
    const [isRemoving, setIsRemoving] = useState(false);

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        해당 문서를 삭제하겠습니까?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        삭제후에는 되돌릴 수 없으며, 문서는 완전히 삭제됩니다.
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
                            취소
                        </AlertDialogCancel>
                        <AlertDialogAction
                            disabled={isRemoving}
                            className="bg-red-500 hover:bg-red-400"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsRemoving(true);
                                remove({ id: documentId })
                                    .catch(() => toast.error(("문제가 발생했습니다.")))
                                    .then(() => toast.success("문서가 제거되었습니다."))
                                    .finally(() => setIsRemoving(false))
                            }}
                        >
                            삭제
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default RemoveDialog
