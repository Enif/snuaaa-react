import React from 'react';
import CategoryType from '../../types/CategoryType';

type CategoryProps = {
    categories: CategoryType[];
    selected?: string;
    clickAll: () => void;
    clickCategory: (category_id: string) => void;
}

function Category({ categories, selected, clickAll, clickCategory }: CategoryProps) {

    const makeCategories = () => {

        if(categories && categories.length > 0) {
            let categoryList = categories.map(category => {
                let style = {
                    "border": `1px solid ${category.category_color}`
                }
                let style_selected = {
                    "border": `1px solid ${category.category_color}`,
                    "backgroundColor": category.category_color,
                    "color": "#eeeeee"
                }
                return (
    
                    <div className="category-obj"
                        key={category.category_id}
                        style={selected === category.category_id ? style_selected : style}
                        onClick={() => {
                            clickCategory(category.category_id)
                        }}>
                        {category.category_name}
                    </div>
                )
            })
            return categoryList
        }
    }

    let style = {
        "border": `1px solid #aaaaaa`
    }
    let style_selected = {
        "backgroundColor": "#aaaaaa",
        "color": "#eeeeee"
    }

    return (
        <div className="category-wrapper">
            <div className="category-obj category-all"
                style={!selected ? style_selected : style}
                onClick={clickAll}>
                ALL
            </div>
            {makeCategories()}
        </div>
    )
}

export default Category;