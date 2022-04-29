import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import DaumPostcode from 'react-daum-postcode';
import storage from "../../storage/storage";
import axios from "axios"



//@ts-ignore
const { kakao } = window;

const EnrollClass = () => {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [detailedAddress, setDetailedAddress] = useState("");
  const [zonecode, setZonecode] = useState("");

  const handleComplete = (data: any) => {
    const { zonecode } = data;

    let fullAddress = data.address;
    let extraAddress = '';
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }

    setSelectedAddress(fullAddress);
    setZonecode(zonecode);
  }

  return (
    <div className="mt-5 md:mt-0 md:col-span-2">
      <form action="#" method="POST">
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
            <h2 className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              <span className="block text-indigo-600">[ 클래스 등록하기 ]</span>
            </h2>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                *카테고리
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">-</span>
                </div>

                <input
                  type="text"
                  id="category"
                  value={category}
                  onChange={({ target }) => setCategory(target.value)}
                  placeholder="   우측에 해당 카테고리가 없을 시, 직접 카테고리를 입력해주세요! "
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full h-10 pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                />
                <div className="absolute inset-y-0 right-0 mr-3 flex items-center">
                  <label htmlFor="currency" className="sr-only">
                    Currency
                  </label>
                  <select
                    id="currency"
                    name="currency"
                    className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>교육 및 학습</option>
                    <option>야외 활동</option>
                    <option>요리 체험</option>
                  </select>
                </div>
              </div>
            </div>


            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                *제목
              </label>
              <input
                type="text"
                name="title"
                id="title"
                autoComplete="given-name"
                placeholder="   클래스 이름 및 내용을 요약해서 적어주세요! "
                className="mt-1 pl-2 focus:ring-indigo-500 focus:border-indigo-500 h-10 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">본인 사진 (선택)</label>
              <div className="mt-1 flex items-center">
                <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                  <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                <button
                  type="button"
                  className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Change
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                *상세 내용
              </label>
              <div className="mt-1">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="shadow-sm p-3 first-line:focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                  placeholder="   클래스에 대한 설명을 적어주세요!"
                  defaultValue={''}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                클래스에 대해 상세히 적어 신청자 수를 늘려보아요!
              </p>
            </div>

            <div className="col-span-6 sm:col-span-3">

              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                *우편번호
              </label>
              <input
                type="text"
                placeholder="어디에서 수업이 이루어지나요?"
                value={zonecode}
                disabled
                className="mt-1 pl-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full h-10 shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
              <DaumPostcode onComplete={handleComplete} className="post-code" />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                *주소
              </label>
              <input
                type="text"
                placeholder="어디에서 수업이 이루어지나요?"
                value={selectedAddress}
                disabled
                className="mt-1 pl-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full h-10 shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                *상세 주소
              </label>
              <input
                type="text"
                placeholder="어디에서 수업이 이루어지나요?"
                value={detailedAddress}
                onChange={e => setDetailedAddress(e.target.value)}
                className="mt-1 pl-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full h-10 shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="limit" className="block text-sm font-medium text-gray-700">
                *참가인원
              </label>
              <input
                type="number"
                placeholder="   수업 최대 참가인원은 몇명인가요? "
                className="mt-1 pl-3 focus:ring-indigo-500 focus:border-indigo-500 h-10 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">사진 등록(추가 설명 사진)</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>여기 클릭</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">또는 드래그 앤 드롭으로 파일 업로드</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF 최대 10MB</p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>


        </div>
      </form>
    </div>
  );
};

export default EnrollClass;
