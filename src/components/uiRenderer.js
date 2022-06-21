import React from 'react';
import classNames from 'classnames';
import ConditionalWrap from 'conditional-wrap';

const breakpoints = ['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs'];
const wrapperComponents = ['Container', 'Row', 'Col'];

const arraysShareKey = (array1, array2) => array1.some(item => array2.includes(item));

const getLayoutClassNames = ({top, bottom, left, right} = {}, className) => {
    return classNames({
        className,
        [`layout__top-${top}`]: top,
        [`layout__bottom-${bottom}`]: bottom,
        [`layout__left-${left}`]: left,
        [`layout__right-${right}`]: right,
    })
}

const render = (uiConfig, components) => {
    const uiConfigArray = Array.isArray(uiConfig) ? uiConfig : [uiConfig];

    return (
        <>
            {uiConfigArray.map((uiConfigItem, index) => {
                const {
                    children,
                    className,
                    component: componentName,
                    layout,
                    wrapper: {
                        component: wrapperComponentName,
                        layout: wrapperLayout,
                        className: wrapperClassName,
                        ...wrapperProps
                    } = {},
                    ...other
                } = uiConfigItem;

                const Component = components[componentName];
                const WrapperComponent = components[wrapperComponentName];

                return (
                    <ConditionalWrap
                        key={index}
                        condition={WrapperComponent}
                        wrap={children => (
                            <WrapperComponent {...wrapperProps} className={getLayoutClassNames(wrapperLayout, wrapperClassName)}>
                                wrapped dude asdf
                                {children}
                            </WrapperComponent>
                        )}
                    >
                        <Component {...other}
                            className={getLayoutClassNames(layout, className)}
                        >
                            {wrapperComponents.includes(componentName) ? render(children, components) : children}
                        </Component>
                    </ConditionalWrap>

                )
            })}
        </>
    )
};

export default render;
