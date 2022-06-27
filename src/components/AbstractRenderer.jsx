import React, { useState } from "react";
import classNames from "classnames";

const breakpoints = ["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"];
const wrapperComponents = ["Container", "Row", "Col"];

const getLayoutClassNames = ({ top, bottom, left, right } = {}, className) => {
    return classNames({
        className,
        [`layout__top-${top}`]: top,
        [`layout__bottom-${bottom}`]: bottom,
        [`layout__left-${left}`]: left,
        [`layout__right-${right}`]: right,
    });
};

const AbstractRenderer = ({ pageConfig, components }) => {
    const pageConfigArray = Array.isArray(pageConfig)
        ? pageConfig
        : [pageConfig];

    const [storeValues, setStoreValues] = useState({});

    return (
        <>
            {pageConfigArray.map((pageConfigItem, index) => {
                const {
                    children,
                    className,
                    component: componentName,
                    displayIf,
                    id,
                    layout,
                    onChange,
                    renderText,
                    ...other
                } = pageConfigItem;

                const Component = components[componentName];

                let renderedChild = children;

                if (!displayIf || eval(displayIf)(storeValues)) {
                    if (renderText) {
                        renderedChild = eval(renderText)(storeValues);
                    } else if (wrapperComponents.includes(componentName)) {
                        renderedChild = (
                            <AbstractRenderer
                                pageConfig={children}
                                components={components}
                            />
                        );
                    }
                } else {
                    renderedChild = null;
                }

                return (
                    <Component
                        key={index}
                        onChange={(e) => {
                            setStoreValues({
                                ...storeValues,
                                [id]: e.target.value,
                            });
                            onChange && onChange(e);
                        }}
                        {...other}
                        className={getLayoutClassNames(layout, className)}
                    >
                        {renderedChild}
                    </Component>
                );
            })}
        </>
    );
};

export default AbstractRenderer;
