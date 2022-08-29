import Components from '../../components/Components'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

describe('test module login', () => {
  test('halaman keluar dengan benar', () => {
    render(<Components />)
  })
})
