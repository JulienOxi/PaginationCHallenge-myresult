import { useEffect, useState } from "react";
import Style from "./Pagination.css"

export default function Pagination({data}){

    const [limit] = useState(10);
    const [currentPage, setCurrentPage] = useState(Number(1));

    //defini le nombre de page
    const nbPages = Math.ceil(data.length/limit);

    const todos = data.slice(((currentPage*limit)-limit), (currentPage*limit))

    const  pageUpdate = ((e) => {
        setCurrentPage(Number(e.target.dataset.page))
    })    

    useEffect(() => {
        switch (currentPage) {
            case 1:
                //desactive le bouton précédent si on est sur la première page
                document.getElementById("btn_prev").setAttribute("disabled", "")
                break;
            case nbPages:
                //desactive le bouton suivant si on est sur la dernière page
                document.getElementById("btn_next").setAttribute("disabled", "")
                break;
            default:
                //supprime l'attribut disabled par default
                document.getElementById("btn_next").removeAttribute("disabled")
                document.getElementById("btn_prev").removeAttribute("disabled")
                break;
        }
    })

    return (
        <>
            {
                todos.map((todo) => {
                    return (<p key={todo.id}>{todo.id} - {todo.title}</p>)
                })
            }
            <div className="pagination">
                <button onClick={pageUpdate} data-page={currentPage-1} id="btn_prev">Précédent</button>
                    <Pages nbPages={nbPages} currentPage={currentPage} pageUpdate={pageUpdate} />
                <button onClick={pageUpdate} data-page={currentPage+1} id="btn_next">Suivant</button>
            </div>
        </>
    )
}

function Pages({nbPages, currentPage, pageUpdate}){
    let pages = [] //le nombre de pages total sous forme de array

    // affichage intelligent
    if(nbPages > 9){
        pages = [1, 2, 3, nbPages-2, nbPages-1, nbPages];

        switch (currentPage) {
            case 1: break;
            case 2:
                pages.splice(3, 0, 4)
                break;
            case 3:
                pages.splice(3, 0, 4, 5)
                break;       
            case 4:
                pages.splice(3, 0, 4, 5, 6)
                break;          
            case 5:
                pages.splice(3, 0, 4, 5, 6, 7)
                break;                     

            case nbPages: break;
            case nbPages-1:
                pages.splice(3, 0, nbPages-3)
                break;
            case nbPages-2:
                pages.splice(3, 0, nbPages-4, nbPages-3)
                break;       
            case nbPages-3:
                pages.splice(3, 0, nbPages-5, nbPages-4, nbPages-3)
                break;                 
            case nbPages-4:
                pages.splice(3, 0, nbPages-6, nbPages-5, nbPages-4, nbPages-3)
                break;                                                
        
            default:
                pages.splice(3, 0, currentPage-2, currentPage-1, currentPage, currentPage+1, currentPage+2)
                break;
        }

        
    }else{//si moin de 10 pages on les affiches toutes normalement
        for (let i = 1; i <= nbPages; i++) {
            pages.push(i);
        }
    }
//affichage normal
    let pageNumber = [];
    pages.forEach(thePage => {
        let pageActive = "";
        if(currentPage === thePage){
            pageActive = "active";
        }      
        
        pageNumber.push(
            <li key={thePage}>
                <button className={pageActive} onClick={pageUpdate} data-page={thePage} >{thePage}</button>
            </li>            
        );        
    });

    return pageNumber;

}