import React, { useState } from "react";
import classNames from "classnames";

const breakpoints = ["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"];
const wrapperComponents = ['Box', "Container", "Row", "Column"];

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
                if (typeof pageConfigItem === 'string') {
                    return pageConfigItem;
                }

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

                const Component = componentName ? components[componentName] : null;

                let renderedChild = children;

                if (!displayIf || eval(displayIf)(storeValues)) {
                    if (renderText) {
                        renderedChild = eval(renderText)(storeValues);
                    } else if (Array.isArray(children) || wrapperComponents.includes(componentName)) {
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

                console.log(renderedChild);

                return (
                    Component ? (<Component
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
                    </Component>) : children
                );
            })}
        </>
    );
};

export default AbstractRenderer;
