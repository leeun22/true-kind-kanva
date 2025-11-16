import Link from 'next/link'

export const description = (
  <>
    <p>
      The website you are experiencing is a design concept created by{' '}
      <Link
        href="https://abhishekjha.me/"
        rel="noopener noreferrer"
        target="_blank"
        className="link !underline text-[#3b3b3b]"
      >
        Abhishek Jha
      </Link>{' '}
      &amp;{' '}
      <Link
        href="https://reksaandhika.com/"
        rel="noopener noreferrer"
        target="_blank"
        className="link !underline text-[#3b3b3b]"
      >
        Reksa Andhika
      </Link>
      . And developed by{' '}
      <Link
        href="https://github.com/leeun22"
        rel="noopener noreferrer"
        target="_blank"
        className="link !underline text-[#3b3b3b]"
      >
        leeun
      </Link>
      . It was developed to showcase design capabilities and user experience possibilities. While the design is
      complete, this is not a finished product for a real business.
    </p>

    <p>
      The functionalities you see, such as adding items to a cart or checking out, are not currently linked to any
      payment processing systems or inventory management software.
    </p>
  </>
)

export const footer = (
  <>
    <p>This website serves as a portfolio piece and is not intended for commercial use.</p>

    <p>
      If you wish to buy these products please head-over to{' '}
      <Link
        className="link !underline text-[#3b3b3b]"
        href="https://betruekind.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        betruekind.com
      </Link>
    </p>
  </>
)
