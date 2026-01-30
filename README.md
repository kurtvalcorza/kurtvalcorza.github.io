# Transcribe Audio with OpenAI Whisper
[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/kurtvalcorza/notebooks/blob/main/Transcribe_Audio_Whisper.ipynb)

This notebook demonstrates how to transcribe audio files using OpenAI's Whisper model via the whisper Python package. It supports common audio formats (e.g., MP3, WAV) and provides a simple pipeline for uploading, transcribing, and saving transcripts.

# Audio Diarization with `gpt-4o-transcribe-diarize`
[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/kurtvalcorza/notebooks/blob/main/speech_to_text_diarization.ipynb)

This notebook demonstrates how to perform audio diarization using OpenAI's `gpt-4o-transcribe-diarize` model. It takes an audio file as input, processes it in chunks, and generates a diarized transcript, identifying different speakers in the audio. Obtain an OpenAI API key from the [OpenAI platform](https://platform.openai.com/).

# H2O Flow in Google Colab
[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/kurtvalcorza/notebooks/blob/main/H2O_Flow_Google_Colab.ipynb)

This notebook provides a step-by-step guide to setting up and accessing H2O Flow within a Google Colab environment. It installs necessary dependencies, initializes the H2O server, and uses localtunnel to create a public URL for the H2O Flow web interface, allowing users to interact with H2O's machine learning capabilities directly from Colab.

# VibeVoice-ASR: Unified Speech-to-Text with Speaker Diarization
[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/kurtvalcorza/notebooks/blob/main/VibeVoice_ASR_Colab.ipynb)

This notebook demonstrates [Microsoft's VibeVoice-ASR](https://huggingface.co/microsoft/VibeVoice-ASR), a 9B parameter model providing unified speech-to-text with speaker diarization and timestamps. Features include 60-minute single-pass processing, consistent speaker tracking, and customizable hotwords for domain-specific accuracy. Requires A100 GPU (Colab Pro) for best results; T4 works with 4-bit quantization.

# Qwen3-ASR: High-Performance Automatic Speech Recognition
[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/kurtvalcorza/notebooks/blob/main/Qwen3_ASR_Colab.ipynb)

This notebook implements the [Qwen3-ASR-1.7B](https://huggingface.co/Qwen/Qwen3-ASR-1.7B) model for fast and accurate Automatic Speech Recognition. It features automatic language detection, high-speed inference on T4 GPUs, and supports transcribing audio files directly from Google Drive.

# Qwen3-TTS Demo
[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/kurtvalcorza/notebooks/blob/main/Qwen3_TTS.ipynb)

This notebook runs the [Qwen3-TTS](https://huggingface.co/spaces/Qwen/Qwen3-TTS) demo. It supports Voice Design (Instruct to Speech), Voice Cloning, and Custom Voices using the Qwen2.5-based TTS models. It is adapted to run on a free Colab GPU (T4).
