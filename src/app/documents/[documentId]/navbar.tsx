"use client"

import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image"
import { BsFilePdf } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { 
    BoldIcon, 
    FileIcon, 
    FileJsonIcon, 
    FilePenIcon, 
    FilePlusIcon, 
    FileTextIcon, 
    GlobeIcon, 
    ItalicIcon, 
    PrinterIcon, 
    Redo2Icon, 
    RemoveFormattingIcon, 
    StrikethroughIcon, 
    TableIcon, 
    TextIcon, 
    TrashIcon, 
    UnderlineIcon, 
    Undo2Icon 
} from "lucide-react";

import DocumentInput from "./document-input";
import { useEditorStore } from "@/store/use-editor-store";
import { 
    Menubar, 
    MenubarItem, 
    MenubarMenu ,
    MenubarTrigger, 
    MenubarContent, 
    MenubarSub, 
    MenubarSubTrigger, 
    MenubarSubContent, 
    MenubarSeparator, 
    MenubarShortcut 
} from "@/components/ui/menubar";
import Avatars from "./avatars";
import Inbox from "./inbox";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Doc } from "../../../../convex/_generated/dataModel";
import RemoveDialog from "@/components/remove-dialog";
import RenameDialog from "@/components/rename-dialog";

interface NavbarProps {
    data: Doc<"documents">;
};

const Navbar = ({ data }: NavbarProps) => {
    const router =useRouter();
    const { editor } = useEditorStore();
    const mutation = useMutation(api.documents.create);

    const onNewDocument = () => {
        mutation({
            title: "제목 없는 문서",
            initialContent: ""
        })
        .catch(() => toast.error("무언가 잘못됨"))
        .then((id) => {
            toast.success("새 문서가 생성되었습니다.");
            router.push(`/documents/${id}`);
        });
    }

    const insertTable = ({ rows, cols }: {rows: number, cols: number }) => {
        editor?.chain().focus().insertTable({ rows, cols, withHeaderRow: false }).run()
    }

    const onDownload = (blob:Blob, filename: string) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
    }

    const onSaveJSON = () => {
        if (!editor) return;

        const content = editor.getJSON();
        const blob = new Blob([JSON.stringify(content)], {
            type: "application/json"
        });
        onDownload(blob, `${data.title}.json`)
    }

    const onSaveHTML = () => {
        if (!editor) return;

        const content = editor.getHTML();
        const blob = new Blob([content], {
            type: "text/html"
        });
        onDownload(blob, `${data.title}.html`)
    }

    const onSaveText = () => {
        if (!editor) return;

        const content = editor.getText();
        const blob = new Blob([content], {
            type: "text/plain"
        });
        onDownload(blob, `${data.title}.txt`)
    }

    return (
        <nav className="flex items-center justify-between">
            {/* 로고 */}
            <div className="flex items-center gap-2">
                <Link href={"/"}>
                    <Image src={"/docs-logo.svg"} alt="로고" width={36} height={36} />
                </Link>

                <div className="flex flex-col">
                    {/* DocumentInput */}
                    <DocumentInput title={data.title} id={data._id} />
                    {/* Menubar */}
                    <div className="flex">
                        <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
                            {/* 파일 메뉴바 */}
                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                                    파일
                                </MenubarTrigger>
                                <MenubarContent className="print:hidden">
                                    <MenubarSub>
                                        <MenubarSubTrigger>
                                            <FileIcon className="size-4 mr-4" />
                                            저장
                                        </MenubarSubTrigger>
                                        <MenubarSubContent>
                                            <MenubarItem onClick={onSaveJSON}>
                                                <FileJsonIcon className="size-4 mr-2" />
                                                JSON
                                            </MenubarItem>
                                            <MenubarItem onClick={onSaveHTML}>
                                                <GlobeIcon className="size-4 mr-2" />
                                                HTML
                                            </MenubarItem>
                                            <MenubarItem onClick={() => window.print()}>
                                                <BsFilePdf className="size-4 mr-2" />
                                                PDF
                                            </MenubarItem>
                                            <MenubarItem onClick={onSaveText}>
                                                <FileTextIcon className="size-4 mr-2" />
                                                Text
                                            </MenubarItem>
                                        </MenubarSubContent>
                                    </MenubarSub>
                                    <MenubarItem onClick={onNewDocument}>
                                        <FilePlusIcon className="size-4 mr-2" />
                                        새 문서
                                    </MenubarItem>
                                    <MenubarSeparator />
                                    <RenameDialog documentId={data._id} initialTitle={data.title}>
                                        <MenubarItem
                                            onClick={(e) => e.stopPropagation()}
                                            onSelect={(e) => e.preventDefault()}
                                        >
                                            <FilePenIcon className="size-4 mr-2" />
                                            이름 변경
                                        </MenubarItem>
                                        </RenameDialog>
                                    <RemoveDialog documentId={data._id}>
                                        <MenubarItem 
                                            onClick={(e) => e.stopPropagation()}
                                            onSelect={(e) => e.preventDefault()}
                                            className="text-red-500"
                                        >
                                            <TrashIcon className="size-4 mr-2 text-red-500" />
                                            문서 제거
                                        </MenubarItem>
                                    </RemoveDialog>
                                    <MenubarSeparator />
                                    <MenubarItem onClick={() => window.print()}>
                                        <PrinterIcon className="size-4 mr-2" />
                                        문서 출력
                                        <MenubarShortcut>
                                            Ctrl+P
                                        </MenubarShortcut>
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                            {/* 수정 메뉴바 */}
                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                                    수정
                                </MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem onClick={() => editor?.chain().focus().undo().run()}>
                                        <Undo2Icon className="size-4 mr-2" />
                                        취소
                                        <MenubarShortcut>
                                            Ctrl+Z
                                        </MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarItem onClick={() => editor?.chain().focus().redo().run()}>
                                        <Redo2Icon className="size-4 mr-2" />
                                        되감기
                                        <MenubarShortcut>
                                            Ctrl+Y
                                        </MenubarShortcut>
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                            {/* 삽입 메뉴바 */}
                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                                    삽입
                                </MenubarTrigger>
                                <MenubarContent>
                                    <MenubarSub>
                                        <MenubarSubTrigger>
                                            <TableIcon className="size-4 mr-4" />
                                            테이블
                                        </MenubarSubTrigger>
                                        <MenubarSubContent>
                                            <MenubarItem onClick={() => insertTable({ rows: 1, cols: 1 })}>
                                                1 x 1
                                            </MenubarItem>
                                            <MenubarItem onClick={() => insertTable({ rows: 2, cols: 2 })}>
                                                2 x 2
                                            </MenubarItem>
                                            <MenubarItem onClick={() => insertTable({ rows: 3, cols: 3 })}>
                                                3 x 3
                                            </MenubarItem>
                                            <MenubarItem onClick={() => insertTable({ rows: 4, cols: 4 })}>
                                                4 x 4
                                            </MenubarItem>
                                        </MenubarSubContent>
                                    </MenubarSub>
                                </MenubarContent>
                            </MenubarMenu>
                            {/* 포맷 메뉴바 */}
                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                                    포맷
                                </MenubarTrigger>
                                <MenubarContent>
                                <MenubarSub>
                                        <MenubarSubTrigger>
                                            <TextIcon className="size-4 mr-4" />
                                            글꼴
                                        </MenubarSubTrigger>
                                        <MenubarSubContent>
                                            <MenubarItem onClick={() => editor?.chain().focus().toggleBold().run()}>
                                                <BoldIcon className="size-4 mr-2" />
                                                굵게
                                                <MenubarShortcut>
                                                Ctrl+B
                                                </MenubarShortcut>
                                            </MenubarItem>
                                            <MenubarItem onClick={() => editor?.chain().focus().toggleItalic().run()}>
                                                <ItalicIcon className="size-4 mr-2" />
                                                기울임꼴
                                                <MenubarShortcut>
                                                Ctrl+I
                                                </MenubarShortcut>
                                            </MenubarItem>
                                            <MenubarItem onClick={() => editor?.chain().focus().toggleUnderline().run()}>
                                                <UnderlineIcon className="size-4 mr-2" />
                                                밑줄
                                                <MenubarShortcut>
                                                Ctrl+U
                                                </MenubarShortcut>
                                            </MenubarItem>
                                            <MenubarItem onClick={() => editor?.chain().focus().toggleStrike().run()}>
                                                <StrikethroughIcon className="size-4 mr-2" />
                                                취소선
                                            </MenubarItem>
                                        </MenubarSubContent>
                                        <MenubarItem onClick={() => editor?.chain().focus().unsetAllMarks().run()}>
                                            <RemoveFormattingIcon className="size-4 mr-2" />
                                            포맷 초기화
                                        </MenubarItem>
                                    </MenubarSub>
                                </MenubarContent>
                            </MenubarMenu>
                        </Menubar>
                    </div>
                </div>
                
            </div>
            <div className="flex gap-3 items-center pl-6">
                <Avatars />
                <Inbox />
                <OrganizationSwitcher
                    afterCreateOrganizationUrl="/"
                    afterLeaveOrganizationUrl="/"
                    afterSelectOrganizationUrl="/"
                    afterSelectPersonalUrl="/"
                />
                <UserButton />
            </div>
        </nav>
    );
};

export default Navbar
