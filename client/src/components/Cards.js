import React, { useEffect, useState } from "react";
import Background from "./Background";
import Ingredients from "./Ingredients";
import Steps from "./Steps";
import Images from "./Images";

const Cards = ({ recipe, RecipeNum, Tab, setTab }) => {

    const [length, setLength] = useState(JSON.parse(localStorage.getItem(`recipe-${parseInt(RecipeNum)}-length`)));

    // retain Tab from localStorage
    useEffect(()=>{
        setTab(JSON.parse(localStorage.getItem(`Tab`)) || "Ingredients")
    }, [setTab])

    // retain Length from localStorage
    // useEffect(()=>{
    //     setLength(JSON.parse(localStorage.getItem(`recipe-${parseInt(RecipeNum)}-length`)) || 0)
    // }, [length])

    // reset Length on recipe change, retain length from local storage on startup
    useEffect(()=>{
        setLength(JSON.parse(localStorage.getItem(`recipe-${parseInt(RecipeNum)}-length`)) || 0)
    }, [RecipeNum])

    // Switch to either selected Tab or Two up display for Ingredients and Steps
    function switchTab (e) { 
        if ((Tab === "Ingredients" && e.target.id === "Steps") || (Tab === "Steps" && e.target.id === "Ingredients")) {
            setTab("Two");
            localStorage.setItem(`Tab`, JSON.stringify("Two"));
        } else if (Tab === "Two" && e.target.id === "Ingredients") {
            setTab("Ingredients");
            localStorage.setItem(`Tab`, JSON.stringify("Ingredients"));
        } else if (Tab === "Two" && e.target.id === "Steps") {
            setTab("Steps");
            localStorage.setItem(`Tab`, JSON.stringify("Steps"));
        } else {
            setTab(e.target.id);
            localStorage.setItem(`Tab`, JSON.stringify(e.target.id)); 
        }
    };

    return (
        <div>
            <div>
                {/* NAV BAR for the recipe */}
                <div className="nav-tabs">
                    <div className={`nav ${((Tab==="Ingredients" || (Tab==="Two"))) ? "active" : ""}`} id="Ingredients" onClick={switchTab}>Ingredients</div>
                    <div className={`nav ${((Tab==="Steps") || (Tab==="Two")) ? "active" : ""}`} id="Steps" onClick={switchTab}>Steps</div>
                    <div className={`nav ${(Tab==="Images") ? "active" : ""}`} id="Images" onClick={switchTab}>Images</div>
                    <div className={`nav ${(Tab==="Story") ? "active" : ""}`} id="Story" onClick={switchTab}>Background</div>
                </div>

                {/* BACKGROUND for the Recipe */}
                <div 
                style={{"display": `${(Tab==="Story") ? "block" : "none"}`}}
                className="card story-container" id="card-1">
                    
                    <Background recipe={recipe} />
                </div>
            </div>

            {/* INGREDIENTS for the Recipe */}
            <div>
                <div
                style={{"display": `${(Tab==="Ingredients") ? "block" : "none"}`}}
                className="card ingredients-container" id="card-1">
                    <Ingredients 
                        recipe={recipe} 
                        Tab={Tab} 
                        length={length}
                        setLength={setLength}
                    />
                </div>
            </div>    

            {/* STEPS for the Recipe */}
            <div>
                <div 
                style={{"display": `${(Tab==="Steps") ? "block" : "none"}`}}
                className="card steps-container" id="card-1">
                    <Steps 
                        recipe={recipe} 
                        Tab={Tab} 
                        length={length}
                        setLength={setLength}
                    />
                </div>
            </div>
            {/* IMAGES for the Recipe */}
            <div>
                <div
                style={{"display": `${(Tab==="Images") ? "flex" : "none"}`}}
                className="card picture-container" id="card-4">
                    <Images recipe={recipe} />
                </div>
            </div>
            {/* Two-Up Display for the Recipe */}
            <div>
                <div
                style={{"display": `${(Tab==="Two") ? "flex" : "none"}`}}
                className="card two-up-container" id="cards-2-3">
                    <div className="half left">
                        <Ingredients 
                            recipe={recipe} 
                            Tab={Tab} 
                            length={length}
                            setLength={setLength}
                        />
                    </div>
                    <div className="half right">
                        <Steps 
                            recipe={recipe} 
                            Tab={Tab} 
                            length={length}
                            setLength={setLength}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cards;