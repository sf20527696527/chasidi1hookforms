import { useState } from "react";
import { useEffect } from "react";

const BookList = () => {

    let [arr, setArr] = useState([]);
    useEffect(() => {

        fetch("http://localhost:5500/books").then(res => res.json())
            .then(data => {
                setArr(data);
            }).catch(err => {
                console.log(err)
            })
    }, [])
    return (<div>
        <h1>רשימת הספרים</h1>
        <ul>
            {arr.map(item => <li>{item.name}</li>)}

        </ul>
    </div>);
}

export default BookList;