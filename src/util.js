import Timeout from 'await-timeout';

export const connectWalletWithTimeout = async (callback, timeout = 40000) => {
    const timer = new Timeout();
    try {
        return await Promise.race([
            callback(),
            timer.set(timeout, `This action with your wallet exceeded the time limit of ${timeout/1000} seconds. Make sure your wallet is installed correctly and everything is working as expected!`)
        ]);
    } finally {
        timer.clear();
    }
}