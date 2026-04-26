<script>
    import { env } from '$env/dynamic/public'
    import { Button } from "$lib/components/ui/button/index.js"
    import gsap from 'gsap';
    import * as Card from '$lib/components/ui/card/index.js'
    let { data } = $props();

    const dollarFormatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        useGrouping: false
    })

    const dateFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    const balance = $derived(dollarFormatter.format(data.balance.available[0].amount / 100));
    const billDay = env.PUBLIC_BILLING_DAY
    const monthlyBill = env.PUBLIC_MONTHLY_CHARGE

    const formattedMonthlyBill = dollarFormatter.format(env.PUBLIC_MONTHLY_CHARGE)

    var now = $state(new Date())
    var finalBillDay = $derived.by(() => {
        var now = new Date()
        var nextBill = new Date()
        nextBill.setDate(billDay)
        nextBill.setHours(0)
        nextBill.setMinutes(0)
        nextBill.setSeconds(0)
        nextBill.setMilliseconds(0)
        if (now.getDate > billDay) nextBill.setMonth(now.getMonth() + 1)
        const numMonths = Math.floor(balance / monthlyBill)
        nextBill.setMonth(nextBill.getMonth() + numMonths)
        return nextBill
    })

    $effect(() => {
        const interval = setInterval(() => {
            now = new Date()
        }, 1000)
        return () => clearInterval(interval)
    })

    const formatter = new Intl.NumberFormat('en-US',  {
        minimumIntegerDigits: 2,
        useGrouping: false
    })

    const formatterDays = new Intl.NumberFormat('en-US', {
        minimumIntegerDigits: 3,
        useGrouping: false
    })

    const timeLeft = $derived(finalBillDay - now)
    const days = $derived(formatterDays.format(Math.floor((timeLeft) / (1000 * 60 * 60 * 24))))
    var lastDays = $state(days)
    var timerDays = $state()
    $effect(() => {
        const s = days;
        if (days !== lastDays) heartbeat(timerDays)
        lastDays = days
    })

    const hourOne = $derived(formatter.format(Math.floor((timeLeft / (1000 * 60 * 60)) % 24)).slice(0,1))
    var lastHourOne = $state(hourOne)
    const hourTwo = $derived(formatter.format(Math.floor((timeLeft / (1000 * 60 * 60)) % 24)).slice(1,2))
    var lastHourTwo = $state(hourTwo)
    var timerHourOne = $state()
    var timerHourTwo = $state()

    $effect(() => {
        const s = hourOne;
        if (hourOne !== lastHourOne) heartbeat(timerHourOne)
        lastHourOne = hourOne
    })
    $effect(() => {
        const s = hourTwo;
        if (hourTwo !== lastHourTwo) heartbeat(timerHourTwo)
        lastHourTwo = hourTwo
    })

    const minOne = $derived(formatter.format(Math.floor((timeLeft / (1000 * 60)) % 60)).slice(0,1))
    var lastMinOne = $state(minOne)
    const minTwo = $derived(formatter.format(Math.floor((timeLeft / (1000 * 60)) % 60)).slice(1,2))
    var lastMinTwo = $state(minTwo)
    var timerMinOne = $state()
    var timerMinTwo = $state()

    $effect(() => {
        const s = minOne;
        if (minOne !== lastMinOne) heartbeat(timerMinOne)
        lastMinOne = minOne
    })
    $effect(() => {
        const s = minTwo;
        if (minTwo !== lastMinTwo) heartbeat(timerMinTwo)
        lastMinTwo = minTwo
    })

    const secOne = $derived(formatter.format(Math.floor((timeLeft / 1000) % 60)).slice(0,1))
    var lastSecOne = $state(secOne)
    const secTwo = $derived(formatter.format(Math.floor((timeLeft / 1000) % 60)).slice(1,2))
    var lastSecTwo = $state(secTwo)
    var timerSecOne = $state()
    var timerSecTwo = $state()

    $effect(() => {
        secOne;
        if (secOne !== lastSecOne) heartbeat(timerSecOne)
        lastSecOne = secOne
    })
    $effect(() => {
        secTwo;
        if (secTwo !== lastSecTwo) heartbeat(timerSecTwo)
        lastSecTwo = secTwo
    })

    function heartbeat(el) {
        const defaultShadow = "0 0 20px white"
        const redShadow = "0 0 20px red"

        gsap.timeline()
            .set(el, { 
                color: "red",
                textShadow: redShadow 
            })
            .to(el, {
                color: 'white',
                textShadow: defaultShadow,
                duration: 0.8,
                ease: "sine.in"
            })
    }

    function getMemeString() {
        const strings = [
            "feed Fred's nugg addiction",
            'keep Lupi goopy',
            'host Dndizzle',
            'fund the manhunt for Michael J Hogan',
            'protect Petros',
            'save Marathon',
            'keep drafting ADC-free ARAMs',
            'brew the potion that keeps Supra perpetually 12 years old',
            'keep the dimensional rift to the Meeting Zone open',
            'never finish Disco Elysium',
            "keep Supra's wireless peripherals charged",
            'defy the Time Wizard'
        ]
        return strings[Math.floor(Math.random() * strings.length)]
    }

    var memeString = $state(getMemeString())

</script>

<div class='relative z-10 flex flex-col items-center justify-center min-h-screen'>
<p class='russo text-[3vw] text-white mb-10'>The Mumble needs your help.</p>
<Card.Root class='w-fit mx-auto bg-slate-300/80'>
    <Card.Content class='flex flex-col items-center gap-3'>
    <p class='funnel text-[2vw]'>The server dies on {finalBillDay.toLocaleDateString('en-US', dateFormatOptions)}</p>
    <p class='funnel text-[1.4vw]'>It costs ${formattedMonthlyBill} per month to {memeString}.</p>
    <p class='funnel text-[1.4vw]'>Current Fund Balance: ${balance}</p>
    <Button 
        href={env.PUBLIC_STRIPE_DONATE_HREF}
        class='bg-indigo-500 hover:bg-indigo-600 text-[2vw] mt-5 p-4 lg:p-8'
        target="_blank"
        rel="noopener noreferrer"
        >Join the Resistance</Button>
    </Card.Content>
</Card.Root>
</div>
<div class='fixed z-0 -bottom-[7vw] w-full opacity-[80%]'>
    <div class='w-fit mx-auto'>
        <span class='flex flex-row ds-digi text-[19vw] text-white'>
            <div class='flex'>
                <span bind:this={timerDays} class='timer'>
                    {days}
                </span>
            </div>
            :
            <div class='flex'>
                <span bind:this={timerHourOne} class='timer w-[1ch] text-right'>
                    {hourOne}
                </span>
                <span bind:this={timerHourTwo} class='timer w-[1ch] text-right'>
                    {hourTwo}
                </span>
            </div>
            :
            <div class='flex'>
                <span bind:this={timerMinOne} class='timer w-[1ch] text-right'>
                    {minOne}
                </span>
                <span bind:this={timerMinTwo} class='timer w-[1ch] text-right'>
                    {minTwo}
                </span>
            </div>
            :
            <div class='flex'>
                <span bind:this={timerSecOne} class='timer w-[1ch] text-right'>
                    {secOne}
                </span>
                <span bind:this={timerSecTwo} class='timer w-[1ch] text-right'>
                    {secTwo}
                </span>
            </div>
        </span>
    </div>
</div>