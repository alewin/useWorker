import 'jsdom-worker'
import { cleanup, renderHook, act } from '@testing-library/react-hooks'
import WORKER_STATUS from '../lib/status'
import { useWorker } from '../useWorker'

const sum = (a: number, b: number): number => a + b

describe('Test useWorker', () => {
  beforeEach(() => {
    cleanup()
  })

  it('useWorker() - return value is an array', () => {
    const { result } = renderHook(() => useWorker(sum))

    expect(Array.isArray(result.current)).toBe(true)
  })

  it('useWorker() - return values', () => {
    const { result } = renderHook(() => useWorker(sum))

    expect(typeof result.current[0]).toBe('function')
    expect(typeof result.current[1]).toBe('string')
    expect(typeof result.current[2]).toBe('function')
  })

  it('useWorker() - STATUS PENDING', () => {
    const { result } = renderHook(() => useWorker(sum))

    expect(result.current[1]).toBe(WORKER_STATUS.PENDING)
  })

  it('useWorker() - Sum Worker', async () => {
    const { result } = renderHook(() => useWorker(sum))

    act(() => {
      result.current[0](1, 2).then((sumResult) => {
        expect(sumResult).toBe(3)
      })
    })
  })
})
