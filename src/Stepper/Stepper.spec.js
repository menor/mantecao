import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import Stepper from './Stepper'
import { EyeClosedIcon } from '../icons'

const ON_CLICK = jest.fn()
const INCREASE_ACTION = jest.fn()
const DECREASE_ACTION = jest.fn()
const CUSTOM_ICON = <EyeClosedIcon small />

describe('Stepper', () => {
  let stepper

  beforeEach(() => {
    stepper = shallow(
      <Stepper
        onClickAction={ON_CLICK}
        onIncreaseClick={INCREASE_ACTION}
        onDecreaseClick={DECREASE_ACTION}
        customIcon={CUSTOM_ICON}
      >
        Click
      </Stepper>
    )
  })

  xit('Renders its children', () => {
    const tree = renderer
      .create(<Stepper>👶👶🏻👶🏼👶🏽👶🏾👶🏿</Stepper>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Should run the OnClickAction passed as a prop when clicked', () => {
    stepper.simulate('click')
    expect(ON_CLICK).toHaveBeenCalled()
  })

  it('Should run the onIncreaseClick action when the inc button is clicked ', () => {
    stepper.find('#mantecao-stepper-inc').simulate('click')
    expect(INCREASE_ACTION).toBeCalled()
  })

  it('Should run the onDecreaseClick action when the inc button is clicked ', () => {
    stepper.find('#mantecao-stepper-dec').simulate('click')
    expect(DECREASE_ACTION).toBeCalled()
  })

  it('Should not run the onClickAction action when the inc button is clicked ', () => {
    ON_CLICK.mockClear()
    stepper.find('#mantecao-stepper-inc').simulate('click')
    expect(ON_CLICK).not.toBeCalled()
  })

  it('Should not run the onClickAction action when the dec button is clicked ', () => {
    ON_CLICK.mockClear()
    stepper.find('#mantecao-stepper-dec').simulate('click')
    expect(ON_CLICK).not.toBeCalled()
  })

  it('Should render a custom icon if passed one as a prop', () => {
    expect(stepper.contains(CUSTOM_ICON)).toBe(true)
  })

  xit('Should not fire the actions if it is disabled', () => {
    ON_CLICK.mockClear()
    INCREASE_ACTION.mockClear()
    DECREASE_ACTION.mockClear()

    const disabledStepper = shallow(
      <Stepper
        onClickAction={ON_CLICK}
        onIncreaseClick={INCREASE_ACTION}
        onDecreaseClick={DECREASE_ACTION}
        disabled
      >
        Click
      </Stepper>
    )

    stepper.simulate('click')
    stepper.find('#mantecao-stepper-inc').simulate('click')
    stepper.find('#mantecao-stepper-dec').simulate('click')

    expect(ON_CLICK).not.toBeCalled()
    expect(INCREASE_ACTION).not.toBeCalled()
    expect(DECREASE_ACTION).not.toBeCalled()
  })
})
