"use client"

export default function CountryPage({ params }: { params: { country: string } }) {
  const { country } = params;

  return (
    <div>
      <h1 className="flex items-center justify-center" >Country: {decodeURIComponent(country).toUpperCase()}</h1>
      <h1 className="h-screen flex items-center justify-center" >Information about {decodeURIComponent(country).toUpperCase()}.</h1>
    </div>
  );
}
