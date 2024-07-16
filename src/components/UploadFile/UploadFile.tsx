import { ChangeEvent, useState } from "react";
import scss from "./UploadFile.module.scss";
import axios from "axios";
import { useId } from "@reach/auto-id";

interface dataObj {
    name: string;
    url: string;
    format: string;
}

function UploadFile() {
    const [file, setFile] = useState<FileList | null>(null);
    const [data, setData] = useState<[]>([]);
    const id = useId();

    const handleUploadFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files);
        } else {
            console.log("файл не выбран!");
        }
    };

    const postUploadFile = async () => {
        try {
            if (!file) return alert("вы не выбрали файл!");
            const formData = new FormData();
            // formData.append("files", file);
            Array.from(file).forEach((item) => formData.append("files", item));

            const { data } = await axios.post(
                "https://api.elchocrud.pro/api/v1/upload/files",
                formData
            );
            setData(data);
        } catch (e) {
            console.error(e);
        }
    };

    // const handler = async (id: dataObj) => {
    //     const filtredData = data.filter((item) => item.url === id);

    //     if (filtredData.length === 0) {
    //         console.log("error");
    //     } else {
    //         const formData = new FormData();
    //         Array.from(filtredData).forEach((item) =>
    //             formData.append("files", item)
    //         );

    //         const { data } = await axios.patch(
    //             "https://api.elchocrud.pro/api/v1/upload/files"
    //         );
    //     }
    // };

    console.log(data);

    return (
        <div className={scss.UploadFile}>
            <h1 className={scss.title}>MultiUploadFiles</h1>
            <div className="container">
                <div className={scss.content}>
                    <div className={scss.actions}>
                        <input
                            className={scss.input}
                            multiple
                            type="file"
                            onChange={handleUploadFileChange}
                        />
                        <button
                            className={scss.button}
                            onClick={postUploadFile}
                        >
                            загрузить файл
                        </button>
                    </div>
                </div>
            </div>
            <h1 className={scss.content_text}>Galery</h1>
            <div className="container">
                <div className={scss.images}>
                    {data.map((item: dataObj) => (
                        <div
                            // onClick={(e) => handler(e.target.src)}
                            className={scss.imgBlock}
                        >
                            <img className={scss.image} src={item.url} alt="" />
                            <div className={scss.infos}>
                                <div className={scss.info}>
                                    <h1 className={scss.imgLabel}>NAME:</h1>
                                    <h1 className={scss.imgValue}>
                                        {item.name}
                                    </h1>
                                </div>
                                <div className={scss.info}>
                                    <h1 className={scss.imgLabel}>FORMAT:</h1>
                                    <h1 className={scss.imgValue}>
                                        {item.format}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UploadFile;
