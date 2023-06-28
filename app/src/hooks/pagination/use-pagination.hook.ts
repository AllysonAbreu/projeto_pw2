import { useState } from "react";
import { PAGINA_INICIAL_DEFAULT } from "../../constants/initialPage/initialPage";


export function usePagination() {
    const [page, setPage] = useState(PAGINA_INICIAL_DEFAULT);

    function handleBeforePage(){
        setPage(page - 1);
    };

    function handleNextPage(){
        setPage(page + 1);
    };

    return {
        page,
        handleBeforePage,
        handleNextPage,
    };
};