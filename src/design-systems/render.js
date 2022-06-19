import React from 'react';
import classNames from 'classnames';
import ConditionalWrap from 'conditional-wrap';

const breakpoints = ['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs'];
const wrapperComponents = ['Container', 'Row', 'Col'];

const arraysShareKey = (array1, array2) => array1.some(item => array2.includes(item))

const render = (uiConfig, components) => {
    return (
        <>
            {uiConfig.map((uiConfigItem, index) => {
                const {
                    children,
                    className,
                    component: componentName,
                    layout,
                    layout: {
                        top, bottom, left, right, sm
                    } = {},
                    ...other
                } = uiConfigItem;

                const Component = components[componentName];
                const wrapWithARow = !wrapperComponents.includes(componentName) && layout && arraysShareKey(breakpoints, Object.keys(layout));

                const wrapperClassNames = classNames({
                    className,
                    [`layout__top-${top}`]: top,
                    [`layout__bottom-${bottom}`]: bottom,
                    [`layout__left-${left}`]: left,
                    [`layout__right-${right}`]: right,
                });

                return (
                    <ConditionalWrap
                        key={index}
                        condition={wrapWithARow}
                        wrap={children => (
                            <div className={wrapperClassNames}>
                                wrapped
                                {children}
                            </div>
                        )}
                    >
                        <Component {...other}
                            className={!wrapWithARow ? wrapperClassNames : null}>
                            {wrapperComponents.includes(componentName) ? render(children, components) : children}
                        </Component>
                    </ConditionalWrap>

                )
            })}
        </>
    )
};

export default render;
