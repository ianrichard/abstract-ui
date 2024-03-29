import React, { useState } from 'react';
import classNames from 'classnames';

const getLayoutClassNames = ({ top, bottom, left, right } = {}, className) => {
    return classNames({
        className,
        [`layout__top-${top}`]: top,
        [`layout__bottom-${bottom}`]: bottom,
        [`layout__left-${left}`]: left,
        [`layout__right-${right}`]: right,
    });
};

const AbstractRenderer = ({ pageConfig, components, patterns }) => {
    const [storeValues, setStoreValues] = useState({});

    const handleInputChange = (e, onChange) => {
        e.preventDefault();
        setStoreValues({
            ...storeValues,
            [e.target.name || e.target.id]: e.target.value,
        });
        onChange && onChange(e);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setStoreValues({
            ...storeValues,
            submitted: true,
        });
    };

    const renderSection = (sectionConfig) => {
        const sectionConfigArray = Array.isArray(sectionConfig)
            ? sectionConfig
            : [sectionConfig];

        return (
            <>
                {sectionConfigArray.map((sectionConfigItem, index) => {
                    if (typeof sectionConfigItem === 'string') {
                        return sectionConfigItem;
                    }

                    const {
                        children,
                        className,
                        component: componentName,
                        displayIf,
                        name,
                        layout,
                        onChange,
                        pattern,
                        renderText,
                        ...other
                    } = sectionConfigItem;

                    const shouldRender =
                        !displayIf || eval(displayIf)(storeValues);
                    if (!shouldRender) {
                        return;
                    }

                    let Component = 'div';

                    if (componentName) {
                        const whitelistedComponent = components[componentName];
                        Component = whitelistedComponent
                            ? whitelistedComponent
                            : componentName;
                    }

                    let renderedChild = children;

                    if (pattern) {
                        renderedChild = renderSection(
                            patterns[pattern](sectionConfigItem)
                        );
                    } else if (renderText) {
                        renderedChild = eval(renderText)(storeValues);
                    } else if (children) {
                        renderedChild = renderSection(children);
                    }

                    return Component ? (
                        <Component
                            className={getLayoutClassNames(layout, className)}
                            key={index + Math.random()}
                            name={name}
                            // todo - dynamically do checks for onchange and submit
                            onChange={(e) => handleInputChange(e, onChange)}
                            onSubmit={handleFormSubmit}
                            {...other}
                        >
                            {renderedChild}
                        </Component>
                    ) : (
                        children
                    );
                })}
            </>
        );
    };

    return <>{renderSection(pageConfig, components)}</>;
};

export default AbstractRenderer;
