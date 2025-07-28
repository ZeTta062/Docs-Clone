import { ExternalLinkIcon, FilePenIcon, MoreVerticalIcon, Trash2Icon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Id } from '../../../convex/_generated/dataModel';
import RemoveDialog from '@/components/remove-dialog';
import RenameDialog from '@/components/rename-dialog';
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
 } from '@/components/ui/dropdown-menu';


interface DocumentMenuProps {
    documentId: Id<"documents">;
    title: string;
    onNewTab: ( id: Id<"documents">) => void;
}

const DocumentMenu = ({ documentId, title, onNewTab }: DocumentMenuProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild >
                <Button variant={"ghost"} size={"icon"} className="rounded-full cursor-pointer">
                    <MoreVerticalIcon className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <RenameDialog 
                    documentId={documentId} 
                    initialTitle={title}
                >
                    <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <FilePenIcon className='size-4 mr-2' />
                        이름 바꾸기
                    </DropdownMenuItem>
                </RenameDialog>
                <RemoveDialog documentId={documentId} >
                    <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Trash2Icon className='size-4 mr-2' />
                        삭제
                    </DropdownMenuItem>
                </RemoveDialog>
                <DropdownMenuItem
                    onClick={() => onNewTab(documentId)}
                >
                    <ExternalLinkIcon className='size-4 mr-2' />
                    새 탭에 열기
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DocumentMenu
