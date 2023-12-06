import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import 'jest-localstorage-mock'
import { useRouter } from 'next/navigation'
import { initUserInfo } from '../pages/profile/index'
import ProfileEdit from '../pages/profile/edit'
import { act } from 'react-dom/test-utils'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

jest.mock('@/hooks/useLocalStorage', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => [JSON.stringify(initUserInfo)]),
}))

describe('ProfileIndex', () => {
  it('renders correctly', () => {
    render(<ProfileEdit />)
    expect(screen.getByText('profile-edit-title')).toBeInTheDocument()
  })

  it('validation form', () => {
    localStorage.setItem('userInfo', JSON.stringify(initUserInfo))
    render(<ProfileEdit />)

    waitFor(() => {
      const submitButton = screen.getByRole('button', { name: 'save' })
      fireEvent.click(submitButton)

      // username
      expect(
        screen.getByText(
          '3-15 characters, start with a letter, and only contain letters, numbers, and underscores'
        )
      ).toBeInTheDocument()

      const usernameInput = screen.getByPlaceholderText('Please enter your username')

      expect(screen.getByText('Username is required')).toBeInTheDocument()

      fireEvent.change(usernameInput, { target: { value: 'a' } })
      expect(screen.getByText('Invalid username')).toBeInTheDocument()

      fireEvent.change(usernameInput, { target: { value: 'my_new_username' } })
      expect(screen.queryByText('Username is required')).not.toBeInTheDocument()
      expect(screen.queryByText('Invalid username')).not.toBeInTheDocument()

      // email
      expect(screen.getByText('Please enter your email')).toBeInTheDocument()
      const emailInput = screen.getByPlaceholderText('Please enter your email')
      fireEvent.change(emailInput, { target: { value: '' } })
      expect(screen.getByText('Email is required')).toBeInTheDocument()

      fireEvent.change(emailInput, { target: { value: 'a' } })
      expect(screen.getByText('Invalid email')).toBeInTheDocument()

      fireEvent.change(emailInput, { target: { value: 'test@test.com' } })
      expect(screen.getByText('Email is required')).not.toBeInTheDocument()
      expect(screen.getByText('Invalid email')).not.toBeInTheDocument()

      // phone
      expect(screen.getByText('Please enter your phone number')).toBeInTheDocument()
      const phoneInput = screen.getByPlaceholderText('Please enter your phone number')
      fireEvent.change(phoneInput, { target: { value: '' } })
      expect(screen.getByText('Phone number is required')).toBeInTheDocument()

      fireEvent.change(phoneInput, { target: { value: '123456' } })
      expect(screen.getByText('Invalid phone number')).toBeInTheDocument()

      fireEvent.change(phoneInput, { target: { value: '12345678900' } })
      expect(screen.getByText('Phone number is required')).not.toBeInTheDocument()
      expect(screen.getByText('Invalid phone number')).not.toBeInTheDocument()

      // verification code
      expect(screen.getByText('6 digit number')).toBeInTheDocument()
      const verificationCodeInput = screen.getByPlaceholderText(
        'Please enter your verification-code'
      )
      expect(screen.getByText('Verification code is required')).toBeInTheDocument()

      fireEvent.change(verificationCodeInput, { target: { value: '123' } })
      expect(screen.getByText('Invalid verification code')).toBeInTheDocument()

      fireEvent.change(verificationCodeInput, { target: { value: '456' } })
      expect(screen.getByText('Verification code is required')).not.toBeInTheDocument()
      expect(screen.getByText('Invalid verification code')).not.toBeInTheDocument()

      // password
      expect(screen.getByText('8 to 20 characters. Spaces are not allowed')).toBeInTheDocument()
      const passwordInput = screen.getByPlaceholderText('Please enter your password')

      expect(passwordInput).toHaveAttribute('type', 'password')
      const InputAdornmentEnd = screen.getByTestId('input-adornment-end')
      fireEvent.click(InputAdornmentEnd)
      expect(passwordInput).toHaveAttribute('type', 'text')

      fireEvent.change(passwordInput, { target: { value: '' } })
      expect(screen.getByText('Password is required')).toBeInTheDocument()

      fireEvent.change(passwordInput, { target: { value: '123456' } })
      expect(
        screen.getByText('Please enter a password of 8 to 20 characters. Spaces are not allowed')
      ).toBeInTheDocument()

      fireEvent.change(passwordInput, { target: { value: '12345678900' } })
      expect(screen.getByText('Password is required')).not.toBeInTheDocument()
      expect(
        screen.getByText('Please enter a password of 8 to 20 characters. Spaces are not allowed')
      ).not.toBeInTheDocument()

      // submit
      const replaceMock = jest.fn()
      useRouter.mockImplementation(() => ({
        replace: replaceMock,
      }))

      act(() => {
        fireEvent.click(submitButton)
      })
      expect(replaceMock).toHaveBeenCalledWith('/profile')
    })
  })

  it('Cancel', () => {
    const replaceMock = jest.fn()
    useRouter.mockImplementation(() => ({
      replace: replaceMock,
    }))

    render(<ProfileEdit />)
    act(() => {
      fireEvent.click(screen.getByText('cancel'))
    })
    expect(replaceMock).toHaveBeenCalled()
  })
})
