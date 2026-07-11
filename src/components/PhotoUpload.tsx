import { useEffect, useState } from 'react';
import { OrbIcon } from '../icons';

type PhotoUploadProps = {
  onContinue: () => void;
};

export function PhotoUpload({ onContinue }: PhotoUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreviewUrl(URL.createObjectURL(file));
  }

  return (
    <div className="screen">
      <OrbIcon size={44} className="ornament" />
      <h2 className="quiz-title">One Last Thing</h2>
      <p className="landing-sub">
        Optional: show the Oracle your face. It doesn't do anything with it yet &mdash; it just
        likes to look.
      </p>

      <div className="photo-dropzone">
        {previewUrl ? (
          <img src={previewUrl} alt="Selected preview" />
        ) : (
          <span>Tap to upload</span>
        )}
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>

      <div className="btn-row">
        <button className="btn btn-ghost" onClick={onContinue}>
          Skip
        </button>
        <button className="btn btn-primary" onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}
