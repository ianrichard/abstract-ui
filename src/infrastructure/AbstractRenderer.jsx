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
    const [storeValues, setStoreValues] = useState({});
    const [normalizedConfig, setNormalizedConfig] = useState([]);

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

    const renderSection = (sectionConfig = []) => {
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
                        component,
                        name,
                        layout,
                        onChange,
                        shouldRender,
                        ...other
                    } = sectionConfigItem;

                    if (!shouldRender) {
                        return;
                    }

                    const Component = component;

                    return (
                        <Component
                            className={getLayoutClassNames(layout, className)}
                            key={index}
                            name={name}
                            // todo - dynamically do checks for onchange and submit
                            onChange={(e) => handleInputChange(e, onChange)}
                            onSubmit={handleFormSubmit}
                            {...other}
                        >
                            {renderSection(children)}
                        </Component>
                    )
                })}
            </>
        );
    };

    useEffect(() => {
        setNormalizedConfig(normalizePageConfig(pageConfig, components, patterns, storeValues));
    }, [pageConfig, storeValues]);

    return <>{renderSection(normalizedConfig)}</>;
};

export default AbstractRenderer;
