// src/components/Pagination.tsx

interface Props {

    currentPage: number;

    totalPages: number;

    onPrevious: () => void;

    onNext: () => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPrevious,
    onNext,
}: Props) {

    return (

        <div className="flex justify-between items-center mt-6">

            <button
                onClick={onPrevious}
                disabled={currentPage === 1}
                className="
                    bg-slate-800
                    hover:bg-slate-900
                    disabled:bg-slate-300
                    text-white
                    px-5
                    py-3
                    rounded-2xl
                    transition
                "
            >

                ← Précédent

            </button>

            <div className="text-slate-600 font-medium">

                Page {currentPage} / {totalPages}

            </div>

            <button
                onClick={onNext}
                disabled={currentPage === totalPages}
                className="
                    bg-blue-600
                    hover:bg-blue-700
                    disabled:bg-slate-300
                    text-white
                    px-5
                    py-3
                    rounded-2xl
                    transition
                "
            >

                Suivant →

            </button>

        </div>
    );
}