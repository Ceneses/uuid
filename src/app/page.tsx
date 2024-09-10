"use client";

import {useState} from "react";

export default function Home() {

    const [list, setList] = useState<string[]>([]);
    const [count, setCount] = useState<number>(1);
    const [selectedOption, setSelectedOption] = useState<string>("lowerCase");
    const [copied, setCopied] = useState<boolean>(false);

    const handleChange = (e: any) => {
        setCount(e.target.value);
    }

    function uuid() {
        let s: any[] = [];
        const hexDigits: string = "0123456789abcdef";
        for (let i = 0; i < 36; i++) {
            s[i]  = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";
        return selectedOption === "upperCase" ? s.join("").toUpperCase() : s.join("").toLowerCase();
    }

    const batchGenerateUUID = () => {
        let arr: any[] = [];
        for (let i = 0; i < count; ++i) {
            arr = [...arr, uuid()];
        }
        clearUUID();
        setList(arr);
    }

    const generateUUID = () => {
        const u1 = uuid();
        setList(Array.of(...list, u1));
    }

    const clearUUID = () => {
        setList([]);
    }

    const copyUUID = async () => {
        try {
            await navigator.clipboard.writeText(Array.of(...list).join("\n"));
            alert("复制成功！");
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // 2秒后重置状态
        } catch (err) {
            console.error('无法复制文本: ', err);
        }
    }

    return (
        <div
            className="mx-64 flex flex-col text-center mt-32 gap-y-4 justify-between item-center">
            <h2 className={"text-4xl text-center"}>UUID生成器</h2>
            <div className={"flex flex-row justify-between"}>
                <div className={"flex flex-row gap-x-4"}>
                    <input type="text" className={"border-slate-200 border-2 rounded-md p-2"}
                           value={count} onChange={handleChange}/>
                    <form className={"flex flex-col justify-center items-center gap-x-4"}>
                        <label>
                            <input type="radio"
                                   value={"upperCase"}
                                   checked={selectedOption === 'upperCase'}
                                   onChange={e => setSelectedOption(e.target.value)}/>
                            大写
                        </label>
                        <label>
                            <input
                                type="radio"
                                value={"lowerCase"}
                                checked={selectedOption === 'lowerCase'}
                                onChange={e => setSelectedOption(e.target.value)}/>
                            小写
                        </label>
                    </form>
                    <button onClick={batchGenerateUUID} className={"px-2 py-3 rounded-md bg-slate-300/20 w-32"}>生成</button>
                    <button onClick={generateUUID} className={"px-2 py-3 rounded-md bg-slate-300/20 w-32"}>增加</button>
                </div>
                <div className={"flex flex-row justify-between gap-x-4"}>
                    <button onClick={copyUUID} className={"px-2 py-3 rounded-md bg-slate-300/20 w-32"}>复制</button>
                    <button onClick={clearUUID} className={"px-2 py-3 rounded-md bg-slate-300/20 w-32"}>清除</button>
                </div>
            </div>
            <div className={"p-4 bg-slate-200/20 rounded-md"}>
                {list.map(k => (<p>{k}</p>))}
            </div>
        </div>
    );
}
