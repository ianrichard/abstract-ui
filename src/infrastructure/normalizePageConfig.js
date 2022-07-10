const normalizePageConfig = (pageConfig = [], components, patterns, storeValues) => {
    const normalizeSection = (sectionConfig) => {
        const sectionConfigArray = Array.isArray(sectionConfig)
            ? sectionConfig
            : [sectionConfig];

        return sectionConfigArray.map((sectionConfigItem, index) => {
            if (typeof sectionConfigItem === 'string') {
                return sectionConfigItem;
            }

            const {
                children,
                component: componentName,
                displayIf,
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
                // normalizeSection returns an array, so getting the first item prevents a nested array return
                return normalizeSection(sectionToRender)[0];
            }

            let renderedChild = children;

            if (typeof renderedChild === 'object') {
                renderedChild = [children];
            }

            if (renderText) {
                renderedChild = eval(renderText)(storeValues);
            } else if (children) {
                renderedChild = normalizeSection(children);
            }

            return {
                ...other,
                shouldRender: !displayIf || eval(displayIf)(storeValues) || false,
                component: components[componentName] ? components[componentName] : componentName,
                children: renderedChild,
            };
        });
    };

    return normalizeSection(pageConfig);
};

export default normalizePageConfig;
