import { useRouter } from 'next/router';

function CheckMailbox() {
  const router = useRouter();
  const email = router.query.e && decodeURIComponent(router.query.e.toString());
  const code = router.query.c && decodeURIComponent(router.query.c.toString());

  return (
    <div className="page text-gray-700" dir="rtl">
      <div className="text-xl font-medium text-gray-500 py-10 text-center">
        <h1 className="text-xl font-medium">בדקי את המייל שלך!</h1>
        <br />
        <div className={'mb-20'}>
          <p>שלחנו לינק התחברות למייל</p>
          <p>{email ? email : 'your email'}</p>
          <p>לחצי עליו כדי להתחבר למערכת</p>
          {code && <p>יהיה שם גם קוד - הסתכלו שהוא תואם - אבל הלינק יחזיר אתכם חזרה בדיוק לאן שאתם צריכים!</p> }
          {code && <p>{code}</p>}
        </div>
        <h1 className="text-xl font-medium" dir={'ltr'}>
          Check your mailbox!
        </h1>
        <div dir="ltr">
          <p>
            We&apos;ve sent you a magic link to {email ? email : 'your email'}.
          </p>
          <p>Click on the link to finish signing in.</p>
          {code && <p>There will also be code - please ensure it matches: {code} - but the link will return you precisely to where you need to be!</p>}
        </div>
      </div>
    </div>
  );
}

export default CheckMailbox;
