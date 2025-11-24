import { Description, DialogTitle } from "@radix-ui/react-dialog"
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "./ui/dialog"
import { useEffect, useRef, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { ArrowLeft, CameraIcon, HardDrive, HardDriveUpload, Pencil, Trash2 } from "lucide-react"
import { Input } from "./ui/input"

const ImageDialog = ({ dialogOpen, setDialogOpen, mode = "picker", setMode, imageUrl, fallbackChar = "U", onPickFile, onRemove }) => {
    const [preview, setPreview] = useState(imageUrl || "")
    const fileRef = useRef(null)

    useEffect(() => {
        setPreview(imageUrl || "")
    }, [imageUrl])

    useEffect(() => {
        return () => {
            if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview)
        }
    }, [preview])

    const handleChoose = async () => {
        if (window.showOpenFilePicker) {
            try {
                const [handle] = await window.showOpenFilePicker({
                    multiple: false,
                    types: [{
                        description: "Images",
                        accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] }
                    }],
                    excludeAcceptAllOption: true,
                });
                const file = await handle.getFile();
                const url = URL.createObjectURL(file);
                setPreview(url)
                onPickFile && onPickFile(file);
                return;
            } catch (e) {
                return;
            }
        }
        // fallback input hidden
        fileRef.current?.click();
    }

    const onInputChange = (e) => {
        const file = e.target.file?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setPreview(url);
        onPickFile && onPickFile(file);
        e.target.value = "";
    }

    const onDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.file?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setPreview(url)
        onPickFile && onPickFile(file);
    }

    const onDragOver = (e) => e.preventDefault();

    return mode === "view" ? (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <div className="flex text-center justify-center">
                        <div className="flex items-center space-x-2">
                            <span className="text-xl font-semibold rounded-md bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-accent pl-1.5 pr-1.5">ProjectHub</span>
                            <span className="text-muted-foreground text-xl font-semibold">Account</span>
                        </div>
                    </div>
                    <DialogTitle className="text-2xl">Profile picture</DialogTitle>
                    <DialogDescription>A picture helps people recognize you and lets you know when you’re signed in to your account</DialogDescription>
                    <div className="flex justify-center my-10">
                        <Avatar className={`size-50 cursor-pointer`} onClick={() => setMode("picker")}>
                            <AvatarImage src={preview || undefined} alt="avatar" />
                            <AvatarFallback className={`text-8xl`}>{fallbackChar.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </div>
                </DialogHeader>
                <div className="flex text-center justify-around grid-rows-2">
                    <Button
                        className={`cursor-pointer rounded-2xl hover:shadow-2xl`}
                        variant={`outline`}
                        size={`lg`}
                        onClick={() => setMode("picker")}
                    >
                        <Pencil />
                        Change
                    </Button>
                    <Button
                        className={`cursor-pointer rounded-2xl hover:shadow-2xl`}
                        variant={`destructive`}
                        size={`lg`}
                        onClick={() => {
                            setPreview("");
                            onRemove && onRemove();
                        }}
                    >
                        <Trash2 />
                        Remove
                    </Button>
                </div>
            </DialogContent>
        </Dialog >
    ) : (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent onDrop={onDrop} onDragOver={onDragOver}>
                <DialogHeader>
                    <div className="absolute size-3 left-1 top-2">
                        <Button
                            variant={`icon`}
                            className={` ring-offset-background opacity-70 transition-opacity hover:text-accent-foreground hover:opacity-100`}
                            onClick={() => setMode("view")}
                        >
                            <ArrowLeft className=" size-4 mb-1  " />
                        </Button>
                    </div>
                    <DialogTitle className="flex justify-center">
                        <div className="flex items-center space-x-2">
                            <span className="text-xl font-medium">Change profile picture</span>
                        </div>
                    </DialogTitle>
                    <DialogDescription className={`flex text-center justify-center flex-col items-center`}>
                        <HardDrive />
                        From computer
                    </DialogDescription>
                    <div className="flex justify-center my-5">
                        <Avatar className={`size-50`} >
                            <AvatarImage src={preview || undefined} alt="avatar" />
                            <AvatarFallback className="text-8xl text-muted-foreground">
                                <CameraIcon className="size-20" />
                            </AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="text-center">{preview ? "Preview above — drop to replace" : "Drag photo here"}</div>
                </DialogHeader>
                <div className="flex text-center justify-around grid-rows-2">
                    <Button
                        className={`cursor-pointer rounded-2xl hover:shadow-2xl`}
                        variant={`outline`}
                        size={`lg`}
                        onClick={handleChoose}
                        id="uploadBtn"
                    >
                        <HardDriveUpload />
                        Upload from computer
                    </Button>
                    <Input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={onInputChange}
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ImageDialog