import MasterSequence from '@/components/MasterSequence';

export default function Home() {
  return (
    <main>
      <MasterSequence />

      {/* Scrollable Content after MasterSequence unpins */}
      <section className="h-screen bg-black flex items-center justify-center text-white">
        <h2 className="text-4xl">Normal Scroll Content</h2>
      </section>
    </main>
  );
}
