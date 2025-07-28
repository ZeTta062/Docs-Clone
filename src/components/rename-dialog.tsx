"use client"

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel"

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger 
} from "@/components/ui/dialog";


interface RenameDialogProps {
    documentId: Id<"documents">;
    initialTitle: string;
    children: React.ReactNode;
}

const RenameDialog = ({
    documentId,
    initialTitle,
    children
}:RenameDialogProps) => {
    const update = useMutation(api.documents.updateById);
    const [isUpdating, setIsUpdating] = useState(false);

    const [title, setTitle] = useState(initialTitle);
    const [open, setOpen] = useState(false);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsUpdating(true);

        update({ id: documentId, title: title.trim() || "제목 없는 문서" })
            .finally(() => {
                setIsUpdating(false);
                setOpen(false);
            });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent onClick={(e) => e.stopPropagation()} >
                <form onSubmit={onSubmit}>
                    <DialogHeader>
                        <DialogTitle>
                            이름 바꾸기
                        </DialogTitle>
                        <DialogDescription>
                            항목의 새 이름을 입력하세요.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="my-4">
                        <Input 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="문서 이름"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant={"ghost"}
                            disabled={isUpdating}
                            onClick={(e) => {
                                e.stopPropagation()
                                setOpen(false);
                            }}
                        >
                            취소
                        </Button>
                        <Button
                            type="submit"
                            disabled={isUpdating}
                            onClick={(e) => e.stopPropagation()}
                        >
                            저장
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default RenameDialog
