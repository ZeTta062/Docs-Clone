import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { SiGoogledocs } from "react-icons/si";
import { Building2Icon, CircleUserIcon } from "lucide-react";

import DocumentMenu from "./document-menu";
import { Doc } from "../../../convex/_generated/dataModel"
import { TableCell, TableRow } from "@/components/ui/table";


interface DocumentRowProps {
    document: Doc<"documents">;
}

const DocumentRow = ({ document}: DocumentRowProps) => {
    const router = useRouter();

    return (
        <TableRow
            onClick={() => router.push(`/documents/${document._id}`)}
            className="cursor-pointer hover:bg-blue-200/50"
        >
            <TableCell className="w-[50px]">
                <SiGoogledocs className="size-6 fill-blue-500" />
            </TableCell>
            <TableCell className="font-medium md:w-[45%]">
                {document.title}
            </TableCell>
            <TableCell className="text-muted-foreground hidden md:flex items-center gap-2">
                {document.organizationId 
                    ? <Building2Icon className="size-4" /> 
                    : <CircleUserIcon className="size-4" />
                }
                {document.organizationId 
                    ? "조직 문서"
                    : "내 문서"
                }
            </TableCell>
            <TableCell className="text-muted-foreground hidden md:table-cell">
                {format(new Date(document._creationTime), "yyyy. M. d.", { locale: ko })}
            </TableCell>
            <TableCell className="flex justify-end">
                <DocumentMenu 
                    documentId={document._id}
                    title={document.title}
                    onNewTab={() => window.open(`/documents/${document._id}`, "_blank")}
                />
            </TableCell>
        </TableRow>
    )
}

export default DocumentRow
