import { useEffect, useState } from "react";
import { FiDatabase } from "react-icons/fi";
import BasicInput from "./Inputs";

const Profile = () => {
    const [modal, setModal] = useState(false);
    const [cusId, setCusId] = useState('');
    const [index, setIndex] = useState(0);

    const baseSelections = ['Default', 'Default (small)'];
    const [selections, setSelections] = useState(baseSelections);

    const defaultIds = [
        "76d3b838-5880-4320-b42f-8bd8273ab6a0",
        "34c762a2-e1cd-44a7-a9ea-56f22d64989e"
    ];

    useEffect(() => {
        const savedId = localStorage.getItem('id');
        if (savedId && !defaultIds.includes(savedId)) {
            setCusId(savedId);
            setSelections([...baseSelections, 'Custom']);
            setIndex(2);
        } else if (savedId) {
            const foundIndex = defaultIds.indexOf(savedId);
            setIndex(foundIndex !== -1 ? foundIndex : 0);
        }
    }, []);

    const handleSelectChange = (e) => {
        const newIndex = parseInt(e.target.value);
        setIndex(newIndex);

        if (newIndex < 2) {
            localStorage.setItem('id', defaultIds[newIndex]);
        } else if (cusId) {
            localStorage.setItem('id', cusId);
        }
    };

    const handleCusIdChange = (e) => {
        const value = e.target.value.trim();
        setCusId(value);

        if (value) {
            localStorage.setItem('id', value);
            if (!selections.includes('Custom')) {
                setSelections([...baseSelections, 'Custom']);
                setIndex(2); // auto-select custom
            }
        } else {
            localStorage.removeItem('id');
            setSelections(baseSelections);
            if (index === 2) setIndex(0); // Reset to Default
        }
    };

    return (
        <div className="h-full relative">
            <FiDatabase className="text-4xl" onClick={() => setModal(!modal)} />
            {modal && (
                <div className="absolute right-0 top-13 z-100 border border-white/30 bg-[#080929] rounded-sm p-4">
                    <p className="text-xl pb-2 text-gray-300">Dataset</p>
                    <select
                        value={index}
                        onChange={handleSelectChange}
                        className="pr-10 bg-[linear-gradient(to_top_right,rgba(24,44,88,0.4)_13.2%,rgba(227,228,252,0.02)_88.27%)] text-[#CF9FFF] border border-[#c8c8c8] rounded-md px-6 py-4 cursor-pointer transition duration-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#466fba]"
                    >
                        {selections.map((opt, i) => (
                            <option key={i} value={i} className="text-black">
                                {opt}
                            </option>
                        ))}
                    </select>

                    <input
                            type="text"
                            placeholder="Custom dataset ID"
                            value={cusId}
                            onChange={handleCusIdChange}
                            className="w-full bg-[#1e1a36] text-white mt-2
                                placeholder:text-gray-400 border border-[#2a263d] 
                                rounded-xl px-5 py-3 focus:outline-none
                                focus:border-[#ffffffe0] focus:border-1 focus:bg-none focus:bg-[#0b0a27] shadow-inner"
                    />
                </div>
            )}
        </div>
    );
};

export default Profile;
