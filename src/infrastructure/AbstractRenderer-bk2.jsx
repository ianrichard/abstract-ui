import React, { useState } from 'react';
import classNames from 'classnames';
import { useEffect } from 'react';
import normalizePageConfig from './normalizePageConfig';

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
    if (!pageConfig || !components) {
        return <p>Loading...</p>;
    }

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

                    if (pattern) {
                        // mutable patterns
                        let sectionToRender = patterns[pattern];
                        // locked down patterns
                        if (typeof sectionToRender === 'function') {
                            sectionToRender = sectionToRender(sectionConfigItem);
                        }
                        return (
                            <React.Fragment key={Math.random()}>
                                {renderSection(sectionToRender)}
                            </React.Fragment>
                        );
                    }

                    const shouldRender =
                        !displayIf || eval(displayIf)(storeValues);
                    if (!shouldRender) {
                        return;
                    }

                    let Component;

                    if (componentName) {
                        const whitelistedComponent = components[componentName];
                        Component = whitelistedComponent
                            ? whitelistedComponent
                            : componentName;
                    }

                    let renderedChild = children;

                    if (renderText) {
                        renderedChild = eval(renderText)(storeValues);
                    } else if (children) {
                        renderedChild = renderSection(children);
                    }

                    return Component ? (
                        <Component
                            className={getLayoutClassNames(layout, className)}
                            key={index}
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

    useEffect(() => {
        normalizePageConfig(pageConfig, components, patterns, storeValues);
    }, [pageConfig]);

    return <>{renderSection(pageConfig, components)}</>;
};

export default AbstractRenderer;
