import { render, screen, fireEvent } from '@testing-library/react'
import 'jest-localstorage-mock'
import { useRouter } from 'next/navigation'
import ProfileIndex, { initUserInfo } from '../pages/profile/index'
import { act } from 'react-dom/test-utils'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('ProfileIndex', () => {
  it('renders correctly', () => {
    render(<ProfileIndex />)
    expect(screen.getByText('profile-index-title')).toBeInTheDocument()
  })

  it('displays user info correctly', async () => {
    localStorage.setItem('userInfo', JSON.stringify(initUserInfo))
    render(<ProfileIndex />)

    const usernameElement = await screen.getByText(initUserInfo.username)
    expect(usernameElement).toBeInTheDocument()

    const emailElement = await screen.findByText(initUserInfo.email)
    expect(emailElement).toBeInTheDocument()

    const phoneElement = await screen.findByText(initUserInfo.phone)
    expect(phoneElement).toBeInTheDocument()

    const birthDateElement = await screen.findByText(initUserInfo.birthDate)
    expect(birthDateElement).toBeInTheDocument()
  })

  it('navigates to /profile/edit when Edit button is clicked', () => {
    const pushMock = jest.fn()
    useRouter.mockImplementation(() => ({
      push: pushMock,
    }))

    render(<ProfileIndex />)
    act(() => {
      fireEvent.click(screen.getByText('edit'))
    })
    expect(pushMock).toHaveBeenCalledWith('/profile/edit')
  })
})
