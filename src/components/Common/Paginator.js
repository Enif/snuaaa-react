import React, { useState } from 'react';

const PAGELISTNUM = 10;

function Paginator({pageIdx, pageNum, clickPage}) {

    const [pageIdxOffset, setPageIdxOffset] = useState(Math.floor((pageIdx - 1) / PAGELISTNUM) * PAGELISTNUM + 1);

    const makePaginator = () => {
        const pageList = [];
        for(let i = 0; i < PAGELISTNUM; i++) {
            if(i + pageIdxOffset > pageNum) break;
            pageList.push(<li key={i + pageIdxOffset} className={pageIdx === i + pageIdxOffset ? "current" : ""} onClick={() => clickPage(i + pageIdxOffset)}>{i + pageIdxOffset}</li>)
        }
        return pageList
    }

    const clickBefore = () => {
        if(pageIdxOffset > PAGELISTNUM) {
            setPageIdxOffset(pageIdxOffset - PAGELISTNUM)
        }
    }

    const clickNext = () => {
        if(pageIdxOffset <= pageNum - PAGELISTNUM) {
            setPageIdxOffset(pageIdxOffset + PAGELISTNUM)
        }
    }

    return (
        <div className="paginator-wrapper">
            <i className="material-icons pointer" onClick={clickBefore}>navigate_before</i>
            <ul>
                {makePaginator()}
            </ul>
            <i className="material-icons pointer" onClick={clickNext} >navigate_next</i>
        </div>
    )
}

export default Paginator;