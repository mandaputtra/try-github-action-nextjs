import Components from '../../components/Components'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

describe('test module login', () => {
  test('halaman keluar dengan benar', () => {
    render(<Components />)
  })
})
